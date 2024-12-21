import { supabase } from '../../supabase/client';
import type { Profile } from './types';

export async function getCurrentUser(): Promise<Profile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return data;
  } catch (error) {
    return null;
  }
}

export async function getPracticeUsers(practiceId: string): Promise<Profile[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('practice_id', practiceId);

    if (error) throw error;
    return data;
  } catch (error) {
    return [];
  }
}