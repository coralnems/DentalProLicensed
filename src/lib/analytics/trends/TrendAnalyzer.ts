import { supabase } from '../../supabase/client';

export interface TrendData {
  category: string;
  count: number;
  growth: number;
}

export class TrendAnalyzer {
  async getPopularTreatments(practiceId: string): Promise<TrendData[]> {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const { data: treatments } = await supabase
      .from('treatments')
      .select('treatment_type, created_at')
      .eq('practice_id', practiceId)
      .gte('created_at', threeMonthsAgo.toISOString());

    return this.calculateTrends(treatments || [], 'treatment_type');
  }

  async getPatientDemographics(practiceId: string): Promise<TrendData[]> {
    const { data: patients } = await supabase
      .from('patients')
      .select(`
        id,
        medical_history,
        created_at
      `)
      .eq('practice_id', practiceId);

    const demographics = patients?.map(patient => ({
      type: this.calculateAgeGroup(patient.medical_history?.dateOfBirth),
      created_at: patient.created_at,
    }));

    return this.calculateTrends(demographics || [], 'type');
  }

  private calculateTrends(
    data: Array<{ [key: string]: any }>,
    categoryKey: string
  ): TrendData[] {
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const twoMonthsAgo = new Date(now.setMonth(now.getMonth() - 1));

    const currentMonth = data.filter(item => 
      new Date(item.created_at) >= oneMonthAgo
    );
    const previousMonth = data.filter(item =>
      new Date(item.created_at) >= twoMonthsAgo &&
      new Date(item.created_at) < oneMonthAgo
    );

    const categories = new Set(data.map(item => item[categoryKey]));
    
    return Array.from(categories).map(category => {
      const currentCount = currentMonth.filter(
        item => item[categoryKey] === category
      ).length;
      const previousCount = previousMonth.filter(
        item => item[categoryKey] === category
      ).length;

      const growth = previousCount === 0 ? 100 :
        ((currentCount - previousCount) / previousCount) * 100;

      return {
        category,
        count: currentCount,
        growth,
      };
    }).sort((a, b) => b.count - a.count);
  }

  private calculateAgeGroup(dateOfBirth: string): string {
    if (!dateOfBirth) return 'Unknown';
    
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    
    if (age < 18) return '0-17';
    if (age < 30) return '18-29';
    if (age < 50) return '30-49';
    if (age < 70) return '50-69';
    return '70+';
  }
}