import React, { useState } from 'react';
import { CreditCard, DollarSign, FileText } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInvoices } from '../lib/api/billing/queries';
import { createInvoice } from '../lib/api/billing/mutations';
import InvoiceModal from '../components/Billing/InvoiceModal';
import CreateInvoiceModal from '../components/Billing/CreateInvoiceModal';
import { formatCurrency } from '../utils/format';
import Alert from '../components/Alerts/Alert';

export default function Billing() {
  const queryClient = useQueryClient();
  const [selectedMonth, setSelectedMonth] = useState('March 2024');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => getInvoices(),
  });

  const createInvoiceMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      setIsCreateModalOpen(false);
      setSuccessMessage('Invoice created successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
  });

  const handleCreateInvoice = async (data: any) => {
    try {
      await createInvoiceMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Billing</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Invoice
        </button>
      </div>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      {/* Rest of the component remains the same */}

      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateInvoice}
        patients={[]} // TODO: Add patients data
        treatments={[]} // TODO: Add treatments data
      />

      <InvoiceModal
        isOpen={!!selectedInvoiceId}
        onClose={() => setSelectedInvoiceId(null)}
        invoice={invoices.find(inv => inv.id === selectedInvoiceId)}
      />
    </div>
  );
}