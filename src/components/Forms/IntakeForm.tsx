import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { intakeFormSchema, type IntakeFormData } from '../../lib/api/intake/types';

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData) => void;
  onCancel: () => void;
}

export default function IntakeForm({ onSubmit, onCancel }: IntakeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Medical History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Do you have any allergies?
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('medicalHistory.hasAllergies')}
                value="yes"
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                {...register('medicalHistory.hasAllergies')}
                value="no"
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {errors.medicalHistory?.hasAllergies && (
            <p className="mt-1 text-sm text-red-600">
              {errors.medicalHistory.hasAllergies.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            If yes, please list your allergies:
          </label>
          <textarea
            {...register('medicalHistory.allergies')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Medications
          </label>
          <textarea
            {...register('medicalHistory.medications')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="List any medications you are currently taking"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Medical Conditions
          </label>
          <div className="mt-2 space-y-2">
            {[
              'Diabetes',
              'Heart Disease',
              'High Blood Pressure',
              'Arthritis',
              'Asthma',
            ].map((condition) => (
              <label key={condition} className="inline-flex items-center mr-6">
                <input
                  type="checkbox"
                  {...register('medicalHistory.conditions')}
                  value={condition}
                  className="form-checkbox"
                />
                <span className="ml-2">{condition}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Dental History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Dental History</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Dental Visit
          </label>
          <input
            type="date"
            {...register('dentalHistory.lastVisit')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Previous Dental Procedures
          </label>
          <textarea
            {...register('dentalHistory.previousProcedures')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="List any previous dental procedures"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Dental Concerns
          </label>
          <textarea
            {...register('dentalHistory.currentConcerns')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe any current dental concerns"
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register('emergencyContact.name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Relationship
            </label>
            <input
              type="text"
              {...register('emergencyContact.relationship')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              {...register('emergencyContact.phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}