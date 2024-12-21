import React, { useState } from 'react';
import { ClipboardList, Plus, CheckCircle2, Filter } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTreatments } from '../lib/api/treatments/queries';
import { createTreatmentPlan } from '../lib/api/treatments/mutations';
import { getPatients } from '../lib/api/patients/queries';
import TreatmentPlanForm from '../components/Forms/TreatmentPlanForm';
import Modal from '../components/Modal/Modal';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import Alert from '../components/Alerts/Alert';
import { formatCurrency } from '../utils/format';

export default function TreatmentPlans() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');

  const { data: treatments = [], isLoading: isLoadingTreatments } = useQuery({
    queryKey: ['treatments'],
    queryFn: getTreatments,
  });

  const { data: patients = [], isLoading: isLoadingPatients } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });

  const createTreatmentMutation = useMutation({
    mutationFn: createTreatmentPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatments'] });
      setIsAddModalOpen(false);
      setSuccessMessage('Treatment plan created successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
  });

  const handleCreateTreatment = async (data: any) => {
    try {
      await createTreatmentMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to create treatment plan:', error);
    }
  };

  if (isLoadingTreatments || isLoadingPatients) return <LoadingSpinner />;

  const filteredTreatments = treatments.filter(treatment => 
    selectedStatus === 'all' || treatment.status === selectedStatus
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Treatment Plans</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Treatment Plan
        </button>
      </div>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      <div className="flex justify-end mb-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded-md text-sm p-2"
        >
          <option value="all">All Status</option>
          <option value="planned">Planned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {treatment.patient.profiles.first_name} {treatment.patient.profiles.last_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {treatment.treatment_type}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {treatment.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">
                    {formatCurrency(treatment.cost)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Insurance: {formatCurrency(treatment.insurance_coverage || 0)}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                    treatment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    treatment.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    treatment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {treatment.status.replace('_', ' ').charAt(0).toUpperCase() + 
                     treatment.status.slice(1).replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredTreatments.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No treatment plans found
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Treatment Plan"
      >
        <TreatmentPlanForm
          onSubmit={handleCreateTreatment}
          onCancel={() => setIsAddModalOpen(false)}
          patients={patients}
        />
      </Modal>
    </div>
  );
}