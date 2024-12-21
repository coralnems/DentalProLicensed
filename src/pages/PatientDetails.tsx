import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, User, Calendar } from 'lucide-react';
import { getPatient } from '../lib/api/patients/queries';
import { submitIntakeForm } from '../lib/api/intake/mutations';
import IntakeForm from '../components/Forms/IntakeForm';
import Modal from '../components/Modal/Modal';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import Alert from '../components/Alerts/Alert';

export default function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isIntakeFormOpen, setIsIntakeFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data: patient, isLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => getPatient(id!),
    enabled: !!id,
  });

  const updateIntakeFormMutation = useMutation({
    mutationFn: (formData: any) => submitIntakeForm(id!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
      setIsIntakeFormOpen(false);
      setSuccessMessage('Medical history updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (!patient) return <Alert type="error" message="Patient not found" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Patient Details
        </h1>
        <button
          onClick={() => setIsIntakeFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Medical History
        </button>
      </div>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-6 w-6 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900">
              Basic Information
            </h2>
          </div>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="text-sm text-gray-900">
                {patient.profiles.first_name} {patient.profiles.last_name}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900">{patient.profiles.email}</dd>
            </div>
            {/* Add more basic info fields */}
          </dl>
        </div>

        {/* Medical History */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900">
              Medical History
            </h2>
          </div>
          <dl className="space-y-3">
            {/* Display medical history fields */}
            {patient.medical_history && (
              <>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                  <dd className="text-sm text-gray-900">
                    {patient.medical_history.allergies || 'None reported'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Conditions</dt>
                  <dd className="text-sm text-gray-900">
                    {patient.medical_history.conditions?.join(', ') || 'None reported'}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900">
              Upcoming Appointments
            </h2>
          </div>
          {/* Display appointments */}
        </div>
      </div>

      <Modal
        isOpen={isIntakeFormOpen}
        onClose={() => setIsIntakeFormOpen(false)}
        title="Update Medical History"
      >
        <IntakeForm
          onSubmit={updateIntakeFormMutation.mutate}
          onCancel={() => setIsIntakeFormOpen(false)}
        />
      </Modal>
    </div>
  );
}