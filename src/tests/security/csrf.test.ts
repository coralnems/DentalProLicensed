import { describe, it, expect } from 'vitest';
import { CSRFProtection } from '../../utils/security/csrf';

describe('CSRF Protection', () => {
  it('should generate valid CSRF tokens', () => {
    const token = CSRFProtection.generateToken();
    expect(token.getValue()).toHaveLength(32);
  });

  it('should create secure cookies', () => {
    const token = CSRFProtection.generateToken();
    const cookie = CSRFProtection.createCookie(token);
    
    expect(cookie).toContain('SameSite=Strict');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Secure');
  });

  it('should validate tokens correctly', () => {
    const token = CSRFProtection.generateToken();
    const isValid = CSRFProtection.validateToken(
      token.getValue(),
      token.getValue()
    );
    expect(isValid).toBe(true);
  });
});