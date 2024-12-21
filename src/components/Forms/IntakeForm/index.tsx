import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { intakeFormSchema, type IntakeFormData } from '../../../lib/api/intake/types';
import BasicInformation from './BasicInformation';
import InsuranceInformation from './InsuranceInformation';
import MedicalHistory from './MedicalHistory';
import DentalHistory from './DentalHistory';
import ConsentAndSignature from './ConsentAndSignature';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <BasicInformation register={register} errors={errors} />
      <InsuranceInformation register={register} errors={errors} />
      <MedicalHistory register={register} errors={errors} />
      <DentalHistory register={register} errors={errors} />
      <ConsentAndSignature register={register} errors={errors} />

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
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </button>
      </div>
    </form>
  );
}