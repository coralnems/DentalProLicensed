import { describe, it, expect } from 'vitest';
import { SecretValue } from '../../utils/security/SecretValue';
import { MaskingPattern } from '../../utils/security/masking';

describe('SecretValue', () => {
  const sensitiveValue = 'super-secret-api-key';

  it('should mask the full value by default', () => {
    const secret = new SecretValue(sensitiveValue);
    expect(secret.toString()).toBe('********');
  });

  it('should show preview with partial masking', () => {
    const secret = new SecretValue(sensitiveValue, {
      pattern: MaskingPattern.PARTIAL,
      previewLength: 4,
    });
    expect(secret.getPreview()).toBe('supe********');
  });

  it('should correctly compare two secret values', () => {
    const secret1 = new SecretValue(sensitiveValue);
    const secret2 = new SecretValue(sensitiveValue);
    const secret3 = new SecretValue('different-value');

    expect(secret1.equals(secret2)).toBe(true);
    expect(secret1.equals(secret3)).toBe(false);
  });

  it('should mask values in JSON stringification', () => {
    const secret = new SecretValue(sensitiveValue);
    const obj = { apiKey: secret };
    expect(JSON.stringify(obj)).toBe('{"apiKey":"********"}');
  });
});