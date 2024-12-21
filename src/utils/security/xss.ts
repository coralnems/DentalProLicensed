const UNSAFE_HTML_REGEX = /<[^>]*>?/g;
const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

export class XSSProtection {
  static sanitizeInput(input: string): string {
    return input
      .replace(UNSAFE_HTML_REGEX, '')
      .replace(SCRIPT_REGEX, '')
      .trim();
  }

  static encodeHTML(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  static validateAndSanitize(input: string | null | undefined): string {
    if (!input) return '';
    return this.sanitizeInput(input);
  }
}