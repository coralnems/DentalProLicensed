import { describe, it, expect } from 'vitest';
import { ValidationMiddleware } from '../../utils/security/validation/middleware';
import { userSchema, patientSchema } from '../../utils/security/validation/schema';

describe('Validation Middleware', () => {
  it('should validate correct user data', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'Test123!@#',
      firstName: 'John',
      lastName: 'Doe',
    };

    const validated = await ValidationMiddleware.validate(userData, userSchema);
    expect(validated).toEqual(userData);
  });

  it('should reject invalid user data', async () => {
    const userData = {
      email: 'invalid-email',
      password: 'weak',
      firstName: '',
      lastName: 'D',
    };

    await expect(
      ValidationMiddleware.validate(userData, userSchema)
    ).rejects.toThrow();
  });

  it('should sanitize XSS attempts', async () => {
    const patientData = {
      firstName: '<script>alert("xss")</script>John',
      lastName: 'Doe',
      email: 'john@example.com',
      dateOfBirth: '1990-01-01',
      phone: '+1234567890',
    };

    const validated = await ValidationMiddleware.validate(
      patientData,
      patientSchema,
      { sanitize: true }
    );

    expect(validated.firstName).toBe('John');
  });
});