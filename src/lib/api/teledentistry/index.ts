import { supabase } from '../../supabase/client';

export interface TeledentistrySession {
  id: string;
  appointmentId: string;
  patientId: string;
  dentistId: string;
  status: 'waiting' | 'in-progress' | 'completed';
  startTime?: string;
  endTime?: string;
  notes?: string;
}

export async function createSession(appointmentId: string): Promise<TeledentistrySession> {
  const { data, error } = await supabase
    .from('teledentistry_sessions')
    .insert([
      { appointment_id: appointmentId, status: 'waiting' }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSessionStatus(
  sessionId: string,
  status: TeledentistrySession['status']
): Promise<void> {
  const { error } = await supabase
    .from('teledentistry_sessions')
    .update({ status })
    .eq('id', sessionId);

  if (error) throw error;
}

export async function saveSessionNotes(
  sessionId: string,
  notes: string
): Promise<void> {
  const { error } = await supabase
    .from('teledentistry_sessions')
    .update({ notes })
    .eq('id', sessionId);

  if (error) throw error;
}