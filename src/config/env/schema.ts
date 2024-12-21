import { z } from 'zod';

export const envSchema = z.object({
  supabase: z.object({
    url: z.string()
      .url('SUPABASE_URL must be a valid URL')
      .startsWith('https://', 'SUPABASE_URL must use HTTPS'),
    
    anonKey: z.string()
      .min(1, 'SUPABASE_ANON_KEY is required'),
  }),
});

export type Env = z.infer<typeof envSchema>;