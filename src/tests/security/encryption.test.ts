import { describe, it, expect } from 'vitest';
import { Encryption } from '../../utils/security/encryption';
import { SecretValue } from '../../utils/security/SecretValue';

describe('Encryption', () => {
  const testValue = 'test-secret-value';

  it('should encrypt and decrypt values', () => {
    const encrypted = Encryption.encrypt(testValue);
    expect(encrypted).toBeInstanceOf(SecretValue);
    
    const decrypted = Encryption.decrypt(encrypted);
    expect(decrypted).toBe(testValue);
  });

  it('should generate consistent hashes', () => {
    const hash1 = Encryption.hash(testValue);
    const hash2 = Encryption.hash(testValue);
    expect(hash1).toBe(hash2);
  });

  it('should throw on invalid decrypt', () => {
    const invalidSecret = new SecretValue('invalid-base64!');
    expect(() => Encryption.decrypt(invalidSecret)).toThrow();
  });
});