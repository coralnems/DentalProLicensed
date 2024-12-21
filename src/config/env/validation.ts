import { envSchema, type Env } from './schema';
import { logger } from '../../utils/logger';

export function validateEnv(env: Record<string, any>): Env {
  const formattedEnv = {
    supabase: {
      url: env.VITE_SUPABASE_URL,
      anonKey: env.VITE_SUPABASE_ANON_KEY,
    },
  };

  const result = envSchema.safeParse(formattedEnv);

  if (!result.success) {
    const errors = result.error.errors.map(error => {
      return `${error.path.join('.')}: ${error.message}`;
    });

    const errorMessage = 'Invalid environment variables:\n' + errors.join('\n');
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return result.data;
}