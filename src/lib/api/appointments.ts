import { supabase } from '../supabase';
import { Appointment } from '../../types';

export async function getAppointments(practiceId: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      patient:patient_id (
        id,
        profiles:user_id (
          first_name,
          last_name
        )
      ),
      dentist:dentist_id (
        first_name,
        last_name
      )
    `)
    .eq('practice_id', practiceId)
    .order('datetime', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createAppointment(appointmentData: Partial<Appointment>) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointmentData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAppointment(
  appointmentId: string,
  appointmentData: Partial<Appointment>
) {
  const { data, error } = await supabase
    .from('appointments')
    .update(appointmentData)
    .eq('id', appointmentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAppointment(appointmentId: string) {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', appointmentId);

  if (error) throw error;
}