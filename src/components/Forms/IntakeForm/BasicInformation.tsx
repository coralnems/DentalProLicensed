import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IntakeFormData } from '../../../lib/api/intake/types';

interface BasicInformationProps {
  register: UseFormRegister<IntakeFormData>;
  errors: FieldErrors<IntakeFormData>;
}

export default function BasicInformation({ register, errors }: BasicInformationProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register('basicInformation.fullName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.basicInformation?.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.basicInformation.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            {...register('basicInformation.dateOfBirth')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.basicInformation?.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.basicInformation.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            {...register('basicInformation.gender')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.basicInformation?.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.basicInformation.gender.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('basicInformation.phoneNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.basicInformation?.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.basicInformation.phoneNumber.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register('basicInformation.email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.basicInformation?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.basicInformation.email.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="mailingAddress" className="block text-sm font-medium text-gray-700">
            Mailing Address
          </label>
          <textarea
            id="mailingAddress"
            rows={3}
            {...register('basicInformation.mailingAddress')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.basicInformation?.mailingAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.basicInformation.mailingAddress.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Emergency Contact</h4>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="emergencyName"
              {...register('basicInformation.emergencyContact.name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.basicInformation?.emergencyContact?.name && (
              <p className="mt-1 text-sm text-red-600">{errors.basicInformation.emergencyContact.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="emergencyRelationship" className="block text-sm font-medium text-gray-700">
              Relationship
            </label>
            <input
              type="text"
              id="emergencyRelationship"
              {...register('basicInformation.emergencyContact.relationship')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.basicInformation?.emergencyContact?.relationship && (
              <p className="mt-1 text-sm text-red-600">{errors.basicInformation.emergencyContact.relationship.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="emergencyPhone"
              {...register('basicInformation.emergencyContact.phoneNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.basicInformation?.emergencyContact?.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.basicInformation.emergencyContact.phoneNumber.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}