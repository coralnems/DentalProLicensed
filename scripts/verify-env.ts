import { config } from 'dotenv';
import { validateEnv } from '../src/config/env/validation';
import fs from 'fs';
import path from 'path';

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.error(`Environment file not found: ${filePath}`);
    process.exit(1);
  }

  const { parsed, error } = config({ path: filePath });

  if (error) {
    console.error('Error loading environment file:', error);
    process.exit(1);
  }

  return parsed;
}

function verifyEnv() {
  try {
    // Load environment variables
    const env = loadEnvFile(path.resolve(process.cwd(), '.env'));

    if (!env) {
      throw new Error('No environment variables found');
    }

    // Validate environment variables
    validateEnv(env);

    console.log('✅ Environment variables are valid');
    process.exit(0);
  } catch (error) {
    console.error('❌ Environment validation failed:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

verifyEnv();