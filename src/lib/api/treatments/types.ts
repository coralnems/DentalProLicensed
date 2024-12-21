import { z } from 'zod';

export const treatmentPlanSchema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  treatment_type: z.string().min(1, 'Treatment type is required'),
  description: z.string().min(1, 'Description is required'),
  cost: z.number().min(0, 'Cost must be a positive number'),
  insurance_coverage: z.number().min(0, 'Insurance coverage must be a positive number'),
  status: z.enum(['planned', 'in_progress', 'completed', 'cancelled']),
});

export type TreatmentPlan = {
  id: string;
  patient_id: string;
  treatment_type: string;
  description: string;
  cost: number;
  insurance_coverage: number | null;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  patient?: {
    id: string;
    profiles: {
      first_name: string;
      last_name: string;
    };
  };
};

export type TreatmentPlanFormData = z.infer<typeof treatmentPlanSchema>;