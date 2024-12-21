import { auditLogger } from './audit';

export class RateLimiter {
  private static readonly store = new Map<string, number[]>();
  
  static checkLimit(
    key: string,
    limit: number,
    windowMs: number
  ): boolean {
    const now = Date.now();
    const timestamps = this.store.get(key) || [];
    
    // Remove expired timestamps
    const validTimestamps = timestamps.filter(
      timestamp => now - timestamp < windowMs
    );
    
    if (validTimestamps.length >= limit) {
      auditLogger.securityEvent('rate-limit.exceeded', 'high', {
        details: { key, limit, windowMs }
      });
      return false;
    }
    
    validTimestamps.push(now);
    this.store.set(key, validTimestamps);
    return true;
  }

  static clearExpired(): void {
    const now = Date.now();
    for (const [key, timestamps] of this.store.entries()) {
      const validTimestamps = timestamps.filter(
        timestamp => now - timestamp < 60000 // 1 minute default
      );
      if (validTimestamps.length === 0) {
        this.store.delete(key);
      } else {
        this.store.set(key, validTimestamps);
      }
    }
  }
}