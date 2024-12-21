import React from 'react';
import Modal from '../Modal/Modal';
import { formatCurrency } from '../../utils/format';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

export default function InvoiceModal({ isOpen, onClose, invoice }: InvoiceModalProps) {
  if (!invoice) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Invoice #${invoice.id}`}
    >
      <div className="space-y-6 p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Patient</h3>
            <p className="text-gray-600">
              {invoice.patient.profiles.first_name} {invoice.patient.profiles.last_name}
            </p>
            <p className="text-gray-600">{invoice.patient.profiles.email}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Date</p>
            <p>{new Date(invoice.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-4">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">{invoice.treatment?.treatment_type || 'General Service'}</td>
                <td className="py-2 text-right">{formatCurrency(invoice.amount)}</td>
              </tr>
              {invoice.insurance_portion && (
                <tr className="text-gray-600">
                  <td className="py-2">Insurance Coverage</td>
                  <td className="py-2 text-right">-{formatCurrency(invoice.insurance_portion)}</td>
                </tr>
              )}
            </tbody>
            <tfoot className="border-t">
              <tr className="font-medium">
                <td className="py-2">Total Due</td>
                <td className="py-2 text-right">
                  {formatCurrency(invoice.patient_portion || invoice.amount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            Print
          </button>
          <button
            onClick={() => {/* Implement payment handling */}}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </Modal>
  );
}