import { useState, useCallback } from 'react';
import { PatientPredictor } from '../lib/analytics/predictive/PatientPredictor';
import { RevenueAnalyzer } from '../lib/analytics/financial/RevenueAnalyzer';
import { TrendAnalyzer } from '../lib/analytics/trends/TrendAnalyzer';
import { useAuthStore } from '../store/authStore';

export function useAnalytics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const patientPredictor = new PatientPredictor();
  const revenueAnalyzer = new RevenueAnalyzer();
  const trendAnalyzer = new TrendAnalyzer();

  const getNoShowPrediction = useCallback(async (patientId: string) => {
    setLoading(true);
    try {
      return await patientPredictor.predictNoShow(patientId);
    } catch (err) {
      setError('Failed to predict no-show probability');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getFinancialMetrics = useCallback(async () => {
    if (!user?.practice_id) throw new Error('No practice ID found');
    
    setLoading(true);
    try {
      const [metrics, topTreatments] = await Promise.all([
        revenueAnalyzer.getMonthlyMetrics(user.practice_id),
        revenueAnalyzer.getTopTreatments(user.practice_id),
      ]);
      return { metrics, topTreatments };
    } catch (err) {
      setError('Failed to fetch financial metrics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.practice_id]);

  const getTrends = useCallback(async () => {
    if (!user?.practice_id) throw new Error('No practice ID found');
    
    setLoading(true);
    try {
      const [treatments, demographics] = await Promise.all([
        trendAnalyzer.getPopularTreatments(user.practice_id),
        trendAnalyzer.getPatientDemographics(user.practice_id),
      ]);
      return { treatments, demographics };
    } catch (err) {
      setError('Failed to fetch trends');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.practice_id]);

  return {
    getNoShowPrediction,
    getFinancialMetrics,
    getTrends,
    loading,
    error,
  };
}