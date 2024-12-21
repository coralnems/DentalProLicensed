import { describe, it, expect, beforeEach } from 'vitest';
import { RateLimiter } from '../../utils/security/rateLimit';

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Clear rate limiter store before each test
    RateLimiter['store'].clear();
  });

  it('should allow requests within limit', () => {
    const key = 'test-user';
    const limit = 5;
    const window = 1000; // 1 second

    for (let i = 0; i < limit; i++) {
      expect(RateLimiter.checkLimit(key, limit, window)).toBe(true);
    }
  });

  it('should block requests over limit', () => {
    const key = 'test-user';
    const limit = 3;
    const window = 1000;

    for (let i = 0; i < limit; i++) {
      RateLimiter.checkLimit(key, limit, window);
    }

    expect(RateLimiter.checkLimit(key, limit, window)).toBe(false);
  });

  it('should reset after window expires', async () => {
    const key = 'test-user';
    const limit = 1;
    const window = 100; // 100ms

    expect(RateLimiter.checkLimit(key, limit, window)).toBe(true);
    expect(RateLimiter.checkLimit(key, limit, window)).toBe(false);

    await new Promise(resolve => setTimeout(resolve, window + 10));
    expect(RateLimiter.checkLimit(key, limit, window)).toBe(true);
  });
});