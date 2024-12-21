import { supabase } from '../supabase';
import { Patient } from '../../types';

export async function getPatients(practiceId: string) {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      profiles:user_id (
        first_name,
        last_name,
        email
      )
    `)
    .eq('practice_id', practiceId);

  if (error) throw error;
  return data;
}

export async function getPatient(patientId: string) {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      profiles:user_id (
        first_name,
        last_name,
        email
      ),
      appointments (
        id,
        datetime,
        status,
        notes
      )
    `)
    .eq('id', patientId)
    .single();

  if (error) throw error;
  return data;
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