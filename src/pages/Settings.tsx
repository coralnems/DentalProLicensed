import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import Alert from '../components/Alerts/Alert';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import { supabase } from '../lib/supabase/client';

export default function Settings() {
  const { user } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Query for fetching practice details
  const { data: practice, isLoading } = useQuery({
    queryKey: ['practice', user?.practice_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('practices')
        .select('*')
        .eq('id', user?.practice_id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.practice_id, // Only run if user.practice_id is defined
  });

  // Mutation for updating practice settings
  const updatePracticeMutation = useMutation({
    mutationFn: async (settings: Record<string, any>) => {
      const { error } = await supabase
        .from('practices')
        .update(settings)
        .eq('id', user?.practice_id);

      if (error) throw error;
    },
    onSuccess: () => {
      setSuccessMessage('Settings updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    },
    onError: () => {
      setError('Failed to update settings');
    },
  });

  if (isLoading) return <LoadingSpinner />; // Show loading spinner while fetching practice data

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Practice Settings</h1>
      </div>

      {/* Success and Error Alerts */}
      {successMessage && (
        <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} />
      )}
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Settings Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const settings = Object.fromEntries(formData.entries());
            updatePracticeMutation.mutate(settings);
          }}
        >
          <div className="space-y-6">
            {/* Practice Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Practice Name</label>
              <input
                type="text"
                name="name"
                defaultValue={practice?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Subscription Tier */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Subscription Tier</label>
              <div className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2">
                {practice?.subscription_tier}
              </div>
            </div>

            {/* Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Settings</label>
              <textarea
                name="settings"
                defaultValue={JSON.stringify(practice?.settings, null, 2)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updatePracticeMutation.isLoading}
                className={`px-4 py-2 rounded-md text-white ${
                  updatePracticeMutation.isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {updatePracticeMutation.isLoading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
