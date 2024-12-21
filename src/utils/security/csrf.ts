import { SecretValue } from './SecretValue';
import { generateRandomString } from '../string';

export class CSRFProtection {
  private static readonly TOKEN_LENGTH = 32;
  private static readonly HEADER_NAME = 'X-CSRF-Token';
  private static readonly COOKIE_NAME = 'csrf-token';

  static generateToken(): SecretValue {
    const token = generateRandomString(this.TOKEN_LENGTH);
    return new SecretValue(token);
  }

  static createCookie(token: SecretValue): string {
    return `${this.COOKIE_NAME}=${token.getValue()}; Path=/; SameSite=Strict; HttpOnly; Secure`;
  }

  static validateToken(token: string, storedToken: string): boolean {
    if (!token || !storedToken) return false;
    return token === storedToken;
  }
}