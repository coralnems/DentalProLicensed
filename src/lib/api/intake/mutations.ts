import { supabase } from '../../supabase/client';
import type { IntakeFormData } from './types';

export async function submitIntakeForm(patientId: string, formData: IntakeFormData) {
  const { data, error } = await supabase
    .from('patients')
    .update({
      medical_history: {
        ...formData.medicalHistory,
        emergency_contact: formData.basicInformation.emergencyContact,
      },
      dental_history: formData.dentalHistory,
      insurance_info: formData.insuranceInformation,
      basic_info: formData.basicInformation,
      consent_records: {
        ...formData.consent,
        signature: formData.signature,
        updated_at: new Date().toISOString(),
      },
    })
    .eq('id', patientId)
    .select()
    .single();

  if (error) throw error;
  return data;
}