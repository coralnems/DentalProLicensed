import React from 'react';
import PatientRegistrationForm from '@/components/Forms/PatientRegistration/PatientRegistrationForm';

export default function PatientRegistration() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Patient Registration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Register a new patient and collect their information
          </p>
        </div>
      </div>

      <PatientRegistrationForm />
    </div>
  );
}