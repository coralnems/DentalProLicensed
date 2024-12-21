import React, { useState } from 'react';
import { FileSignature, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import IntakeForm from '../components/Forms/IntakeForm';
import Modal from '../components/Modal/Modal';
import Alert from '../components/Alerts/Alert';
import { submitIntakeForm } from '../lib/api/intake/mutations';

export default function DigitalForms() {
  const user = useAuthStore((state) => state.user);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (data: any) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      await submitIntakeForm(user.id, data);
      setIsFormOpen(false);
      setSuccessMessage('Form submitted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setError('Failed to submit form. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Digital Forms</h1>
      </div>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError('')}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FileSignature className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">
                Patient Intake Form
              </h3>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Complete your medical history and personal information for our records.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Fill Out Form
          </button>
        </div>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Patient Intake Form"
      >
        <IntakeForm
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </div>
  );
}