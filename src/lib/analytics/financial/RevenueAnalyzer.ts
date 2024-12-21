import { supabase } from '../../supabase/client';

export interface RevenueMetrics {
  totalRevenue: number;
  insurancePayouts: number;
  outOfPocket: number;
  pendingClaims: number;
}

export interface TreatmentMetrics {
  treatmentType: string;
  revenue: number;
  count: number;
  averageCost: number;
}

export class RevenueAnalyzer {
  async getMonthlyMetrics(practiceId: string): Promise<RevenueMetrics> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: billing } = await supabase
      .from('billing')
      .select('*')
      .eq('practice_id', practiceId)
      .gte('created_at', startOfMonth.toISOString());

    return billing?.reduce((metrics, bill) => ({
      totalRevenue: metrics.totalRevenue + bill.amount,
      insurancePayouts: metrics.insurancePayouts + (bill.insurance_portion || 0),
      outOfPocket: metrics.outOfPocket + (bill.patient_portion || 0),
      pendingClaims: metrics.pendingClaims + (bill.status === 'pending' ? bill.amount : 0),
    }), {
      totalRevenue: 0,
      insurancePayouts: 0,
      outOfPocket: 0,
      pendingClaims: 0,
    }) || {
      totalRevenue: 0,
      insurancePayouts: 0,
      outOfPocket: 0,
      pendingClaims: 0,
    };
  }

  async getTopTreatments(practiceId: string): Promise<TreatmentMetrics[]> {
    const { data: treatments } = await supabase
      .from('treatments')
      .select(`
        treatment_type,
        cost
      `)
      .eq('practice_id', practiceId);

    const metrics = treatments?.reduce((acc, treatment) => {
      const existing = acc.get(treatment.treatment_type) || {
        treatmentType: treatment.treatment_type,
        revenue: 0,
        count: 0,
        averageCost: 0,
      };

      existing.revenue += treatment.cost;
      existing.count += 1;
      existing.averageCost = existing.revenue / existing.count;

      acc.set(treatment.treatment_type, existing);
      return acc;
    }, new Map<string, TreatmentMetrics>());

    return Array.from(metrics?.values() || [])
      .sort((a, b) => b.revenue - a.revenue);
  }
}