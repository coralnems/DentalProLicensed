import { z } from 'zod';

// Form schemas
export const newPatientSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
  appointmentType: z.enum(['checkup', 'cleaning', 'procedure', 'emergency']),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  insurance: z.object({
    provider: z.string().min(1, 'Insurance provider is required'),
    policyNumber: z.string().min(1, 'Policy number is required'),
  }),
  notes: z.string().max(500).optional(),
});

export type NewPatientFormData = z.infer<typeof newPatientSchema>;

// Database types
export interface Patient {
  id: string;
  practice_id: string;
  user_id: string;
  medical_history: Record<string, any>;
  insurance_info: Record<string, any>;
  created_at: string;
}

export interface PatientWithProfile extends Patient {
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
  };
}