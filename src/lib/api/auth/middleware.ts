import { supabase } from '../../supabase/client';
import { auditLogger } from '../../../utils/security/audit';
import { RateLimiter } from '../../../utils/security/rateLimit';
import { CSRFProtection } from '../../../utils/security/csrf';
import type { Profile } from './types';

export async function requireAuth() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

export async function requireRole(allowedRoles: Profile['role'][]) {
  const user = await requireAuth();
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !allowedRoles.includes(profile.role)) {
    throw new Error('Forbidden');
  }

  return { user, role: profile.role };
}

export async function validateCSRFToken(token: string) {
  const storedToken = await supabase
    .from('csrf_tokens')
    .select('token')
    .eq('user_id', (await requireAuth()).id)
    .single();

  if (!storedToken || !CSRFProtection.validateToken(token, storedToken.data.token)) {
    throw new Error('Invalid CSRF token');
  }
}

export function createRateLimiter(
  action: string,
  limit: number = 100,
  windowMs: number = 60000
) {
  return async function checkRateLimit(userId: string) {
    const key = `${action}:${userId}`;
    
    if (!RateLimiter.checkLimit(key, limit, windowMs)) {
      auditLogger.securityEvent('rate-limit.exceeded', 'high', {
        userId,
        action,
        limit,
        windowMs,
      });
      throw new Error('Rate limit exceeded');
    }
  };
}