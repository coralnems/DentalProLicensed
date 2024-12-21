import { storageClient, STORAGE_BUCKETS, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from './StorageConfig';
import { generateRandomString } from '../utils/string';
import { auditLogger } from '../utils/security/audit';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async uploadFile(
    file: File,
    bucket: keyof typeof STORAGE_BUCKETS,
    options: {
      patientId?: string;
      recordType?: string;
      metadata?: Record<string, any>;
    } = {}
  ): Promise<string> {
    // Validate file
    if (!this.validateFile(file, bucket)) {
      throw new Error('Invalid file type or size');
    }

    // Generate unique filename
    const extension = file.name.split('.').pop();
    const filename = `${generateRandomString(16)}.${extension}`;
    const path = this.generatePath(bucket, filename, options);

    try {
      const { error: uploadError } = await storageClient
        .storage
        .from(STORAGE_BUCKETS[bucket])
        .upload(path, file, {
          cacheControl: '3600',
          contentType: file.type,
          upsert: false,
          metadata: {
            ...options.metadata,
            originalName: file.name,
            uploadedAt: new Date().toISOString(),
          },
        });

      if (uploadError) throw uploadError;

      // Log the upload
      auditLogger.log('storage.file.upload', {
        bucket,
        path,
        metadata: options.metadata,
      });

      return path;
    } catch (error) {
      auditLogger.securityEvent('storage.file.upload.error', 'high', {
        error: error instanceof Error ? error.message : 'Upload failed',
        bucket,
        path,
      });
      throw error;
    }
  }

  async downloadFile(
    path: string,
    bucket: keyof typeof STORAGE_BUCKETS
  ): Promise<Blob> {
    try {
      const { data, error } = await storageClient
        .storage
        .from(STORAGE_BUCKETS[bucket])
        .download(path);

      if (error) throw error;
      return data;
    } catch (error) {
      auditLogger.securityEvent('storage.file.download.error', 'medium', {
        error: error instanceof Error ? error.message : 'Download failed',
        bucket,
        path,
      });
      throw error;
    }
  }

  async deleteFile(
    path: string,
    bucket: keyof typeof STORAGE_BUCKETS
  ): Promise<void> {
    try {
      const { error } = await storageClient
        .storage
        .from(STORAGE_BUCKETS[bucket])
        .remove([path]);

      if (error) throw error;

      auditLogger.log('storage.file.delete', {
        bucket,
        path,
      });
    } catch (error) {
      auditLogger.securityEvent('storage.file.delete.error', 'high', {
        error: error instanceof Error ? error.message : 'Delete failed',
        bucket,
        path,
      });
      throw error;
    }
  }

  async getFileUrl(
    path: string,
    bucket: keyof typeof STORAGE_BUCKETS
  ): Promise<string> {
    const { data } = await storageClient
      .storage
      .from(STORAGE_BUCKETS[bucket])
      .getPublicUrl(path);

    return data.publicUrl;
  }

  private validateFile(
    file: File,
    bucket: keyof typeof STORAGE_BUCKETS
  ): boolean {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }

    // Check file type based on bucket
    switch (bucket) {
      case 'XRAYS':
        return ALLOWED_FILE_TYPES.XRAYS.includes(file.type);
      case 'DOCUMENTS':
        return ALLOWED_FILE_TYPES.DOCUMENTS.includes(file.type);
      case 'PROFILE_IMAGES':
        return ALLOWED_FILE_TYPES.IMAGES.includes(file.type);
      default:
        return true;
    }
  }

  private generatePath(
    bucket: keyof typeof STORAGE_BUCKETS,
    filename: string,
    options: { patientId?: string; recordType?: string }
  ): string {
    const parts = [options.patientId, options.recordType, filename]
      .filter(Boolean);
    return parts.join('/');
  }
}