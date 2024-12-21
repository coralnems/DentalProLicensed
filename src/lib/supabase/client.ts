import { createClient } from '@supabase/supabase-js';
import { validatedEnv } from '../../config/env';
import type { Database } from './types';

export const supabase = createClient<Database>(
  validatedEnv.supabase.url,
  validatedEnv.supabase.anonKey
);