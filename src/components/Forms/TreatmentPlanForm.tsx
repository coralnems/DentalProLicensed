import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const treatmentPlanSchema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  treatment_type: z.string().min(1, 'Treatment type is required'),
  description: z.string().min(1, 'Description is required'),
  cost: z.number().min(0, 'Cost must be a positive number'),
  insurance_coverage: z.number().min(0, 'Insurance coverage must be a positive number'),
  status: z.enum(['planned', 'in_progress', 'completed', 'cancelled']),
});

type TreatmentPlanFormData = z.infer<typeof treatmentPlanSchema>;

interface TreatmentPlanFormProps {
  onSubmit: (data: TreatmentPlanFormData) => void;
  onCancel: () => void;
  patients: Array<{ id: string; profiles: { first_name: string; last_name: string } }>;
}

export default function TreatmentPlanForm({
  onSubmit,
  onCancel,
  patients,
}: TreatmentPlanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TreatmentPlanFormData>({
    resolver: zodResolver(treatmentPlanSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="patient_id" className="block text-sm font-medium text-gray-700">
          Patient
        </label>
        <select
          id="patient_id"
          {...register('patient_id')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.profiles.first_name} {patient.profiles.last_name}
            </option>
          ))}
        </select>
        {errors.patient_id && (
          <p className="mt-1 text-sm text-red-600">{errors.patient_id.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="treatment_type" className="block text-sm font-medium text-gray-700">
          Treatment Type
        </label>
        <input
          type="text"
          id="treatment_type"
          {...register('treatment_type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.treatment_type && (
          <p className="mt-1 text-sm text-red-600">{errors.treatment_type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
            Cost
          </label>
          <input
            type="number"
            id="cost"
            step="0.01"
            min="0"
            {...register('cost', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.cost && (
            <p className="mt-1 text-sm text-red-600">{errors.cost.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="insurance_coverage" className="block text-sm font-medium text-gray-700">
            Insurance Coverage
          </label>
          <input
            type="number"
            id="insurance_coverage"
            step="0.01"
            min="0"
            {...register('insurance_coverage', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.insurance_coverage && (
            <p className="mt-1 text-sm text-red-600">{errors.insurance_coverage.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="planned">Planned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
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
          {isSubmitting ? 'Creating...' : 'Create Treatment Plan'}
        </button>
      </div>
    </form>
  );
}