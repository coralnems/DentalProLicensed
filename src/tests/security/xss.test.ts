import { describe, it, expect } from 'vitest';
import { XSSProtection } from '../../utils/security/xss';

describe('XSS Protection', () => {
  it('should sanitize HTML input', () => {
    const input = '<script>alert("xss")</script>Hello<img src="x" onerror="alert(1)">';
    const sanitized = XSSProtection.sanitizeInput(input);
    expect(sanitized).toBe('Hello');
  });

  it('should encode HTML special characters', () => {
    const input = '<div>Test & "quote" \'single\'</div>';
    const encoded = XSSProtection.encodeHTML(input);
    expect(encoded).not.toContain('<');
    expect(encoded).not.toContain('>');
    expect(encoded).toContain('&lt;');
    expect(encoded).toContain('&gt;');
  });

  it('should handle null/undefined inputs', () => {
    expect(XSSProtection.validateAndSanitize(null)).toBe('');
    expect(XSSProtection.validateAndSanitize(undefined)).toBe('');
  });
});