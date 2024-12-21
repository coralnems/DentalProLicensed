import { describe, it, expect } from 'vitest';
import { MaskingPattern, applyMaskingPattern } from '../../utils/security/masking';

describe('Masking Patterns', () => {
  const testValue = 'test-secret-value';

  it('should apply full masking', () => {
    const masked = applyMaskingPattern(testValue, {
      pattern: MaskingPattern.FULL,
    });
    expect(masked).toBe('********');
  });

  it('should apply partial masking', () => {
    const masked = applyMaskingPattern(testValue, {
      pattern: MaskingPattern.PARTIAL,
      previewLength: 4,
    });
    expect(masked).toBe('test********');
  });

  it('should apply custom pattern masking', () => {
    const masked = applyMaskingPattern('test@example.com', {
      pattern: MaskingPattern.CUSTOM,
      customPattern: /@.*$/,
      suffix: '@*****',
    });
    expect(masked).toBe('test@*****');
  });
});