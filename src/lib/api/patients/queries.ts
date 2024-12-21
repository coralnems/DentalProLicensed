import { supabase } from '../../supabase/client';
import { useAuthStore } from '../../../store/authStore';

export async function getPatients() {
  const user = useAuthStore.getState().user;
  if (!user?.practice_id) throw new Error('No practice ID found');

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
    .eq('practice_id', user.practice_id);

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