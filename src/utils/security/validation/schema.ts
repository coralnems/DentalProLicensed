import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain uppercase, lowercase, number, and special character'
  ),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

export const patientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/),
  insurance: z.object({
    provider: z.string(),
    policyNumber: z.string(),
  }).optional(),
});

export const appointmentSchema = z.object({
  patientId: z.string().uuid(),
  dentistId: z.string().uuid(),
  datetime: z.string().datetime(),
  duration: z.number().min(15).max(240),
  type: z.enum(['checkup', 'cleaning', 'procedure', 'emergency']),
  notes: z.string().max(1000).optional(),
});