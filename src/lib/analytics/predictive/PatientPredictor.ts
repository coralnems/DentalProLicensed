import { supabase } from '../../supabase/client';

export class PatientPredictor {
  async predictNoShow(patientId: string): Promise<number> {
    const { data: history } = await supabase
      .from('appointments')
      .select('status')
      .eq('patient_id', patientId);

    if (!history?.length) return 0;

    const noShows = history.filter(apt => apt.status === 'cancelled').length;
    return (noShows / history.length) * 100;
  }

  async identifyHighRiskPatients(): Promise<string[]> {
    const { data: patients } = await supabase
      .from('patients')
      .select(`
        id,
        medical_history,
        appointments (
          status
        )
      `);

    return patients
      ?.filter(patient => {
        const conditions = patient.medical_history?.conditions || [];
        const noShows = patient.appointments?.filter(apt => 
          apt.status === 'cancelled'
        ).length || 0;
        
        return conditions.length > 2 || noShows > 3;
      })
      .map(patient => patient.id) || [];
  }
}