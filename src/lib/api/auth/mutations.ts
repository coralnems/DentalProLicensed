import { supabase } from '../../supabase/client';
import type { AuthResponse } from './types';
import type { Profile } from './types';

export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;

    return { user: profile };
  } catch (error) {
    return { user: null, error: 'Invalid credentials' };
  }
}

export async function signUp(
  email: string,
  password: string,
  userData: Partial<Profile>
): Promise<AuthResponse> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (authError) throw authError;

    const profileData = {
      id: authData.user?.id,
      email,
      ...userData,
    };

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single();

    if (profileError) throw profileError;

    return { user: profile };
  } catch (error) {
    return { user: null, error: 'Failed to create account' };
  }
}

export async function resetPassword(email: string): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return {};
  } catch (error) {
    return { error: 'Failed to send reset email' };
  }
}

export async function updatePassword(
  newPassword: string
): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return {};
  } catch (error) {
    return { error: 'Failed to update password' };
  }
}