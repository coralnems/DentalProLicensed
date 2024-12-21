import { z } from 'zod';

// Environment schema
const envSchema = z.object({
  supabase: z.object({
    url: z.string().url('Invalid Supabase URL'),
    anonKey: z.string().min(1, 'Supabase anon key is required'),
  }),
});

// Environment values
const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
} as const;

// Validate and export environment
export const validatedEnv = envSchema.parse(env);

// Type for validated environment
export type Env = z.infer<typeof envSchema>;