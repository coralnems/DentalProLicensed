import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IntakeFormData } from '../../../lib/api/intake/types';

interface MedicalHistoryProps {
  register: UseFormRegister<IntakeFormData>;
  errors: FieldErrors<IntakeFormData>;
}

export default function MedicalHistory({ register, errors }: MedicalHistoryProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700">
            Current Medications
          </label>
          <textarea
            id="currentMedications"
            {...register('medicalHistory.currentMedications')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="List any medications you are currently taking"
          />
        </div>

        <div>
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
            Allergies
          </label>
          <textarea
            id="allergies"
            {...register('medicalHistory.allergies')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="List any allergies (e.g., medications, latex)"
          />
        </div>

        <div>
          <label htmlFor="chronicConditions" className="block text-sm font-medium text-gray-700">
            Chronic Conditions or Diseases
          </label>
          <textarea
            id="chronicConditions"
            {...register('medicalHistory.chronicConditions')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="List any chronic conditions or diseases"
          />
        </div>

        <div>
          <label htmlFor="previousSurgeries" className="block text-sm font-medium text-gray-700">
            Previous Surgeries or Hospitalizations
          </label>
          <textarea
            id="previousSurgeries"
            {...register('medicalHistory.previousSurgeries')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="List any previous surgeries or hospitalizations"
          />
        </div>

        <div>
          <label htmlFor="pregnancyStatus" className="block text-sm font-medium text-gray-700">
            Pregnancy or Breastfeeding
          </label>
          <select
            id="pregnancyStatus"
            {...register('medicalHistory.pregnancyStatus')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not Applicable">Not Applicable</option>
          </select>
        </div>

        <div>
          <label htmlFor="tobaccoUse" className="block text-sm font-medium text-gray-700">
            Smoking or Tobacco Use
          </label>
          <select
            id="tobaccoUse"
            {...register('medicalHistory.tobaccoUse')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </div>
  );
}