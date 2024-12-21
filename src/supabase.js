// src/supabase.js

import { createClient } from '@supabase/supabase-js';

// Access the environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
