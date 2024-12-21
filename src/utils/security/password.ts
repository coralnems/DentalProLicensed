import { generateRandomString } from '../string';

export function generateSecurePassword(): string {
  // Generate a secure random password with:
  // - At least 12 characters
  // - Mix of uppercase, lowercase, numbers, and special characters
  const length = 12;
  const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*'
  };

  // Ensure at least one character from each set
  let password = '';
  password += generateRandomString(1, charset.uppercase);
  password += generateRandomString(1, charset.lowercase);
  password += generateRandomString(1, charset.numbers);
  password += generateRandomString(1, charset.special);

  // Fill the rest with random characters from all sets
  const allChars = Object.values(charset).join('');
  password += generateRandomString(length - 4, allChars);

  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}