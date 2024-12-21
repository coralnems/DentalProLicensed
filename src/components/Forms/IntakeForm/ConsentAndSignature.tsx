import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IntakeFormData } from '../../../lib/api/intake/types';

interface ConsentAndSignatureProps {
  register: UseFormRegister<IntakeFormData>;
  errors: FieldErrors<IntakeFormData>;
}

export default function ConsentAndSignature({ register, errors }: ConsentAndSignatureProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Consent and Agreements</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              {...register('consent.hipaaAcknowledgment')}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              I acknowledge that I have received and reviewed the Notice of Privacy Practices (HIPAA).
            </span>
          </label>
          {errors.consent?.hipaaAcknowledgment && (
            <p className="mt-1 text-sm text-red-600">{errors.consent.hipaaAcknowledgment.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              {...register('consent.treatmentConsent')}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              I consent to dental treatment and agree to follow all recommended treatment plans.
            </span>
          </label>
          {errors.consent?.treatmentConsent && (
            <p className="mt-1 text-sm text-red-600">{errors.consent.treatmentConsent.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              {...register('consent.financialAgreement')}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              I understand and agree to the financial policies and my responsibility for payment.
            </span>
          </label>
          {errors.consent?.financialAgreement && (
            <p className="mt-1 text-sm text-red-600">{errors.consent.financialAgreement.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              {...register('consent.telehealthConsent')}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              I consent to telehealth services when appropriate (optional).
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <h4 className="text-md font-medium text-gray-900">Signature</h4>
        
        <div>
          <label htmlFor="signatureName" className="block text-sm font-medium text-gray-700">
            Patient/Guardian Name
          </label>
          <input
            type="text"
            id="signatureName"
            {...register('signature.name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.signature?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.signature.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="signatureData" className="block text-sm font-medium text-gray-700">
            Signature
          </label>
          <input
            type="text"
            id="signatureData"
            {...register('signature.signatureData')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Type your full name to sign"
          />
          {errors.signature?.signatureData && (
            <p className="mt-1 text-sm text-red-600">{errors.signature.signatureData.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="signatureDate" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="signatureDate"
            {...register('signature.date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.signature?.date && (
            <p className="mt-1 text-sm text-red-600">{errors.signature.date.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}