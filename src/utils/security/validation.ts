import { z } from 'zod';
import { SecretValue } from './SecretValue';

export const envValidation = {
  supabase: {
    url: z.string()
      .url('SUPABASE_URL must be a valid URL')
      .startsWith('https://', 'SUPABASE_URL must use HTTPS'),
    
    anonKey: z.string()
      .min(1, 'SUPABASE_ANON_KEY is required')
      .transform(val => new SecretValue(val)),
    
    jwtSecret: z.string()
      .min(1, 'SUPABASE_JWT_SECRET is required')
      .transform(val => new SecretValue(val)),
  },
};