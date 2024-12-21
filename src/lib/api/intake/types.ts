import { z } from 'zod';

export const intakeFormSchema = z.object({
  basicInformation: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    gender: z.enum(['Male', 'Female', 'Non-Binary', 'Prefer not to say']),
    phoneNumber: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
    email: z.string().email('Invalid email address'),
    mailingAddress: z.string().min(1, 'Address is required'),
    emergencyContact: z.object({
      name: z.string().min(1, 'Emergency contact name is required'),
      relationship: z.string().min(1, 'Relationship is required'),
      phoneNumber: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
    }),
  }),
  insuranceInformation: z.object({
    primaryProvider: z.string().min(1, 'Primary insurance provider is required'),
    policyholderName: z.string().min(1, 'Policyholder name is required'),
    policyNumber: z.string().min(1, 'Policy number is required'),
    groupNumber: z.string().optional(),
    employerName: z.string().optional(),
    secondaryProvider: z.string().optional(),
    secondaryPolicyNumber: z.string().optional(),
  }),
  medicalHistory: z.object({
    currentMedications: z.string().optional(),
    allergies: z.string().optional(),
    chronicConditions: z.string().optional(),
    previousSurgeries: z.string().optional(),
    pregnancyStatus: z.enum(['Yes', 'No', 'Not Applicable']).optional(),
    tobaccoUse: z.enum(['Yes', 'No']).optional(),
  }),
  dentalHistory: z.object({
    reasonForVisit: z.string().min(1, 'Reason for visit is required'),
    previousDentist: z.string().optional(),
    lastDentalVisit: z.string().optional(),
    dentalIssues: z.array(z.string()).optional(),
    oralHygieneRoutine: z.string().optional(),
  }),
  consent: z.object({
    hipaaAcknowledgment: z.boolean().refine(val => val === true, 'HIPAA acknowledgment is required'),
    treatmentConsent: z.boolean().refine(val => val === true, 'Treatment consent is required'),
    financialAgreement: z.boolean().refine(val => val === true, 'Financial agreement is required'),
    telehealthConsent: z.boolean().optional(),
  }),
  signature: z.object({
    name: z.string().min(1, 'Signature name is required'),
    signatureData: z.string().min(1, 'Signature is required'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  }),
});

export type IntakeFormData = z.infer<typeof intakeFormSchema>;