import { useState, useCallback } from 'react';
import { StorageService } from '../lib/storage/StorageService';
import type { STORAGE_BUCKETS } from '../lib/storage/StorageConfig';

export function useStorage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const storage = StorageService.getInstance();

  const uploadFile = useCallback(async (
    file: File,
    bucket: keyof typeof STORAGE_BUCKETS,
    options?: {
      patientId?: string;
      recordType?: string;
      metadata?: Record<string, any>;
    }
  ) => {
    setUploading(true);
    setError(null);

    try {
      const path = await storage.uploadFile(file, bucket, options);
      return path;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const downloadFile = useCallback(async (
    path: string,
    bucket: keyof typeof STORAGE_BUCKETS
  ) => {
    try {
      return await storage.downloadFile(path, bucket);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      throw err;
    }
  }, []);

  const deleteFile = useCallback(async (
    path: string,
    bucket: keyof typeof STORAGE_BUCKETS
  ) => {
    try {
      await storage.deleteFile(path, bucket);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
      throw err;
    }
  }, []);

  const getFileUrl = useCallback(async (
    path: string,
    bucket: keyof typeof STORAGE_BUCKETS
  ) => {
    try {
      return await storage.getFileUrl(path, bucket);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get file URL');
      throw err;
    }
  }, []);

  return {
    uploadFile,
    downloadFile,
    deleteFile,
    getFileUrl,
    uploading,
    error,
  };
}