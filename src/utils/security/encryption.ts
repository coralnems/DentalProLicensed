import { webcrypto } from 'node:crypto';
import { SecretValue } from './SecretValue';

export class Encryption {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;

  private static async generateKey(): Promise<CryptoKey> {
    return await webcrypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  private static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await webcrypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return await webcrypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: this.ALGORITHM, length: this.KEY_LENGTH },
      true,
      ['encrypt', 'decrypt']
    );
  }

  static async encrypt(value: string, password: string): Promise<SecretValue> {
    const encoder = new TextEncoder();
    const salt = webcrypto.getRandomValues(new Uint8Array(16));
    const iv = webcrypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    const key = await this.deriveKey(password, salt);

    const encrypted = await webcrypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv,
      },
      key,
      encoder.encode(value)
    );

    const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);

    return new SecretValue(Buffer.from(combined).toString('base64'));
  }

  static async decrypt(secret: SecretValue, password: string): Promise<string> {
    try {
      const combined = Buffer.from(secret.getValue(), 'base64');
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const encrypted = combined.slice(28);

      const key = await this.deriveKey(password, salt);
      const decrypted = await webcrypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv,
        },
        key,
        encrypted
      );

      return new TextDecoder().decode(decrypted);
    } catch (error) {
      throw new Error('Failed to decrypt value');
    }
  }
}