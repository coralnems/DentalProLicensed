import React from 'react';
import { Activity, Users, Calendar, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/Stats/StatsCard';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import Alert from '../components/Alerts/Alert';
import { getDashboardStats } from '../lib/api/dashboard';
import { formatCurrency, formatDate } from '../utils/format';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });

  const handleNewAppointment = () => {
    navigate('/appointments', { state: { openNewAppointment: true } });
  };

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (error) return <Alert type="error" message="Failed to load dashboard data" />;

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: stats?.revenueData || [],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  const appointmentsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Appointments',
      data: stats?.appointmentsData || [],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderRadius: 6,
    }],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Practice Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => navigate('/reports')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <Activity className="h-4 w-4 mr-2" />
            Analytics
          </button>
          <button
            onClick={handleNewAppointment}
            className="px-4 py-2 bg-blue-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value={stats?.totalPatients || 0}
          icon={Users}
          trend={{ value: '+5.2%', positive: true }}
        />
        <StatsCard
          title="Today's Appointments"
          value={stats?.todayAppointments || 0}
          icon={Calendar}
          trend={{ value: '+2.3%', positive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(stats?.monthlyRevenue || 0)}
          icon={TrendingUp}
          trend={{ value: '+8.1%', positive: true }}
        />
        <StatsCard
          title="Patient Satisfaction"
          value="98%"
          icon={Activity}
          trend={{ value: '+1.2%', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
            <select className="text-sm border-gray-300 rounded-md">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <LineChart data={revenueData} height={300} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Appointments Overview</h3>
            <select className="text-sm border-gray-300 rounded-md">
              <option>This week</option>
              <option>Last week</option>
              <option>Last month</option>
            </select>
          </div>
          <BarChart data={appointmentsData} height={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {stats?.todayAppointments > 0 ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">John Smith</p>
                      <p className="text-sm text-gray-500">Regular Checkup</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2:30 PM</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No appointments scheduled for today
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {[
              { title: 'Insurance Verification Required', type: 'warning' },
              { title: 'New Patient Forms Pending Review', type: 'info' },
              { title: 'Equipment Maintenance Due', type: 'alert' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <AlertCircle className={`h-5 w-5 mr-3 ${
                  alert.type === 'warning' ? 'text-yellow-500' :
                  alert.type === 'info' ? 'text-blue-500' :
                  'text-red-500'
                }`} />
                <span className="text-gray-900">{alert.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}