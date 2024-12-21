import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IntakeFormData } from '../../../lib/api/intake/types';

interface DentalHistoryProps {
  register: UseFormRegister<IntakeFormData>;
  errors: FieldErrors<IntakeFormData>;
}

export default function DentalHistory({ register, errors }: DentalHistoryProps) {
  const dentalIssues = [
    'Bleeding gums',
    'Tooth sensitivity',
    'Teeth grinding (bruxism)',
    'Jaw pain (TMJ)',
    'Previous orthodontic treatment',
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Dental History</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="reasonForVisit" className="block text-sm font-medium text-gray-700">
            Reason for Visit
          </label>
          <textarea
            id="reasonForVisit"
            {...register('dentalHistory.reasonForVisit')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.dentalHistory?.reasonForVisit && (
            <p className="mt-1 text-sm text-red-600">{errors.dentalHistory.reasonForVisit.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="previousDentist" className="block text-sm font-medium text-gray-700">
            Previous Dentist Name
          </label>
          <input
            type="text"
            id="previousDentist"
            {...register('dentalHistory.previousDentist')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="lastDentalVisit" className="block text-sm font-medium text-gray-700">
            Date of Last Dental Visit
          </label>
          <input
            type="date"
            id="lastDentalVisit"
            {...register('dentalHistory.lastDentalVisit')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dental Issues (check all that apply)
          </label>
          <div className="space-y-2">
            {dentalIssues.map((issue) => (
              <label key={issue} className="flex items-center">
                <input
                  type="checkbox"
                  value={issue}
                  {...register('dentalHistory.dentalIssues')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{issue}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="oralHygieneRoutine" className="block text-sm font-medium text-gray-700">
            Oral Hygiene Routine
          </label>
          <textarea
            id="oralHygieneRoutine"
            {...register('dentalHistory.oralHygieneRoutine')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe your daily oral hygiene routine"
          />
        </div>
      </div>
    </div>
  );
}