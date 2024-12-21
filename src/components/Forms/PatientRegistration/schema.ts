import { z } from 'zod';

export const patientRegistrationSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number is required'),
    address: z.object({
      street: z.string().min(1, 'Street address is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      zipCode: z.string().min(5, 'ZIP code is required')
    })
  }),
  insurance: z.object({
    provider: z.string().min(1, 'Insurance provider is required'),
    policyNumber: z.string().min(1, 'Policy number is required'),
    groupNumber: z.string().optional(),
    policyHolder: z.string().min(1, 'Policy holder name is required')
  }),
  medicalHistory: z.object({
    conditions: z.string(),
    medications: z.string(),
    allergies: z.string(),
    surgeries: z.string()
  }),
  dentalHistory: z.object({
    lastVisit: z.string(),
    concerns: z.string(),
    sensitivities: z.string(),
    currentSymptoms: z.string()
  })
});