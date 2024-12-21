import { supabase } from '../supabase/client';

export async function getDashboardStats() {
  const today = new Date().toISOString().split('T')[0];
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  try {
    const [patientsCount, todayAppointments, monthlyRevenue] = await Promise.all([
      supabase.from('patients').select('id', { count: 'exact' }),
      supabase
        .from('appointments')
        .select('id')
        .gte('datetime', today)
        .lt('datetime', new Date(today + 'T23:59:59').toISOString()),
      supabase
        .from('billing')
        .select('amount')
        .gte('created_at', lastMonth.toISOString()),
    ]);

    if (patientsCount.error) throw patientsCount.error;
    if (todayAppointments.error) throw todayAppointments.error;
    if (monthlyRevenue.error) throw monthlyRevenue.error;

    // Sample data for demonstration - in production, this would be real data
    const revenueData = [30000, 35000, 32000, 38000, 42000, 45000];
    const appointmentsData = [12, 15, 18, 14, 16, 10, 8];

    return {
      totalPatients: patientsCount.count || 0,
      todayAppointments: todayAppointments.data?.length || 0,
      monthlyRevenue: monthlyRevenue.data?.reduce((sum, record) => sum + record.amount, 0) || 0,
      revenueData,
      appointmentsData,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}