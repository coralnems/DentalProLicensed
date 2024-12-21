import { supabase } from '../../supabase/client';
import { generateRandomString } from '../../../utils/string';
import type { NewPatientFormData, Patient } from './types';

function generateTempPassword(): string {
  // Generate a secure temporary password
  const length = 12;
  const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*'
  };

  let password = '';
  password += generateRandomString(1, charset.uppercase);
  password += generateRandomString(1, charset.lowercase);
  password += generateRandomString(1, charset.numbers);
  password += generateRandomString(1, charset.special);
  password += generateRandomString(length - 4);

  return password;
}

export async function createPatient(patientData: Partial<Patient>) {
  const { data, error } = await supabase
    .from('patients')
    .insert(patientData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createNewPatient(data: NewPatientFormData) {
  // First create the user profile
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: generateTempPassword(),
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        role: 'patient',
      },
    },
  });

  if (authError) throw authError;

  // Then create the patient record
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .insert({
      user_id: authData.user!.id,
      medical_history: {},
      insurance_info: {
        provider: data.insurance.provider,
        policy_number: data.insurance.policyNumber,
      },
    })
    .select()
    .single();

  if (patientError) throw patientError;

  // Finally create the appointment
  const { data: appointment, error: appointmentError } = await supabase
    .from('appointments')
    .insert({
      patient_id: patient.id,
      type: data.appointmentType,
      datetime: `${data.preferredDate}T${data.preferredTime}`,
      notes: data.notes,
    })
    .select()
    .single();

  if (appointmentError) throw appointmentError;

  return { patient, appointment };
}

export async function updatePatient(
  patientId: string,
  patientData: Partial<Patient>
) {
  const { data, error } = await supabase
    .from('patients')
    .update(patientData)
    .eq('id', patientId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePatient(patientId: string) {
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', patientId);

  if (error) throw error;
}