import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IntakeFormData } from '../../../lib/api/intake/types';

interface InsuranceInformationProps {
  register: UseFormRegister<IntakeFormData>;
  errors: FieldErrors<IntakeFormData>;
}

export default function InsuranceInformation({ register, errors }: InsuranceInformationProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Insurance Information</h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="primaryProvider" className="block text-sm font-medium text-gray-700">
            Primary Insurance Provider
          </label>
          <input
            type="text"
            id="primaryProvider"
            {...register('insuranceInformation.primaryProvider')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.insuranceInformation?.primaryProvider && (
            <p className="mt-1 text-sm text-red-600">{errors.insuranceInformation.primaryProvider.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="policyholderName" className="block text-sm font-medium text-gray-700">
            Policyholder Name
          </label>
          <input
            type="text"
            id="policyholderName"
            {...register('insuranceInformation.policyholderName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.insuranceInformation?.policyholderName && (
            <p className="mt-1 text-sm text-red-600">{errors.insuranceInformation.policyholderName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700">
            Policy Number
          </label>
          <input
            type="text"
            id="policyNumber"
            {...register('insuranceInformation.policyNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.insuranceInformation?.policyNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.insuranceInformation.policyNumber.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="groupNumber" className="block text-sm font-medium text-gray-700">
            Group Number (optional)
          </label>
          <input
            type="text"
            id="groupNumber"
            {...register('insuranceInformation.groupNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="employerName" className="block text-sm font-medium text-gray-700">
            Employer Name (optional)
          </label>
          <input
            type="text"
            id="employerName"
            {...register('insuranceInformation.employerName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Secondary Insurance (optional)</h4>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="secondaryProvider" className="block text-sm font-medium text-gray-700">
              Secondary Insurance Provider
            </label>
            <input
              type="text"
              id="secondaryProvider"
              {...register('insuranceInformation.secondaryProvider')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="secondaryPolicyNumber" className="block text-sm font-medium text-gray-700">
              Secondary Policy Number
            </label>
            <input
              type="text"
              id="secondaryPolicyNumber"
              {...register('insuranceInformation.secondaryPolicyNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}