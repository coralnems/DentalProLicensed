import React from 'react';
import { TrendingUp, Users, Brain, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import StatsCard from '../components/Stats/StatsCard';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import Alert from '../components/Alerts/Alert';
import { useAnalytics } from '../hooks/useAnalytics';
import { formatCurrency } from '../utils/format';

export default function AnalyticsAI() {
  const { getFinancialMetrics, getTrends } = useAnalytics();

  const { data: financialData, isLoading: isLoadingFinancials, error: financialError } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: getFinancialMetrics
  });

  const { data: trendsData, isLoading: isLoadingTrends, error: trendsError } = useQuery({
    queryKey: ['trends'],
    queryFn: getTrends
  });

  if (isLoadingFinancials || isLoadingTrends) {
    return <LoadingSpinner size="lg" />;
  }

  if (financialError || trendsError) {
    return (
      <Alert 
        type="error" 
        message="Failed to load analytics data. Please try again later." 
      />
    );
  }

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: financialData?.metrics?.monthlyRevenue || [],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  const treatmentData = {
    labels: trendsData?.treatments?.map(t => t.category) || [],
    datasets: [{
      label: 'Treatments',
      data: trendsData?.treatments?.map(t => t.count) || [],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderRadius: 6,
    }],
  };

  return (
    <div className="space-y-6">
      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(financialData?.metrics?.totalRevenue || 0)}
          icon={DollarSign}
          trend={{ value: '+8.2%', positive: true }}
        />
        <StatsCard
          title="Patient Growth"
          value={trendsData?.demographics?.[0]?.count || 0}
          icon={Users}
          trend={{ value: '+12.3%', positive: true }}
        />
        <StatsCard
          title="Treatment Success"
          value="94%"
          icon={Brain}
          trend={{ value: '+5.1%', positive: true }}
        />
        <StatsCard
          title="Predicted Growth"
          value="+15%"
          icon={TrendingUp}
          trend={{ value: '+2.4%', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Revenue Overview
          </h3>
          <LineChart data={revenueData} height={300} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Popular Treatments
          </h3>
          <BarChart data={treatmentData} height={300} />
        </div>
      </div>
    </div>
  );
}