import type { Database } from '../../supabase/types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserRole = Profile['role'];

export interface AuthResponse {
  user: Profile | null;
  error?: string;
}