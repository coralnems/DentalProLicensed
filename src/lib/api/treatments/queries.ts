import { supabase } from '../../supabase/client';

export async function getTreatments() {
  const { data, error } = await supabase
    .from('treatments')
    .select(`
      *,
      patient:patient_id (
        id,
        profiles:user_id (
          first_name,
          last_name
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTreatment(id: string) {
  const { data, error } = await supabase
    .from('treatments')
    .select(`
      *,
      patient:patient_id (
        id,
        profiles:user_id (
          first_name,
          last_name
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}