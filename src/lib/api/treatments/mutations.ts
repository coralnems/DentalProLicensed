import { supabase } from '../../supabase/client';
import type { TreatmentPlan } from './types';

export async function createTreatmentPlan(treatmentData: Partial<TreatmentPlan>) {
  const { data, error } = await supabase
    .from('treatments')
    .insert(treatmentData)
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
    .single();

  if (error) throw error;
  return data;
}

export async function updateTreatmentPlan(
  id: string,
  treatmentData: Partial<TreatmentPlan>
) {
  const { data, error } = await supabase
    .from('treatments')
    .update(treatmentData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}