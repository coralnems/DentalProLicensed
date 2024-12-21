import { useState, useCallback } from 'react';
import { MedicalRecordManager } from '../lib/blockchain/RecordManager';
import { useAuthStore } from '../store/authStore';

export function useBlockchain() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const recordManager = new MedicalRecordManager();

  const addRecord = useCallback(async (
    patientId: string,
    recordType: string,
    recordData: any
  ) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const blockHash = await recordManager.addRecord(
        patientId,
        recordType,
        recordData,
        user.id
      );
      return blockHash;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add record');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const verifyRecord = useCallback((
    blockHash: string,
    recordData: any
  ) => {
    return recordManager.verifyRecordIntegrity(blockHash, recordData);
  }, []);

  const getHistory = useCallback((
    patientId: string
  ) => {
    return recordManager.getRecordHistory(patientId);
  }, []);

  return {
    addRecord,
    verifyRecord,
    getHistory,
    loading,
    error
  };
}