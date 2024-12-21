import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const storageClient = createClient(supabaseUrl, supabaseKey);

export const STORAGE_BUCKETS = {
  PATIENT_RECORDS: 'patient-records',
  XRAYS: 'xrays',
  DOCUMENTS: 'documents',
  PROFILE_IMAGES: 'profile-images',
} as const;

export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  XRAYS: ['application/dicom', 'image/jpeg', 'image/png'],
} as const;

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB