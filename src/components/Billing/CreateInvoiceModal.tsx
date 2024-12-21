import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const invoiceSchema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  treatment_id: z.string().min(1, 'Treatment is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  insurance_portion: z.number().optional(),
  patient_portion: z.number().optional(),
  notes: z.string().optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InvoiceFormData) => void;
  patients: Array<{
    id: string;
    profiles: { first_name: string; last_name: string };
  }>;
  treatments: Array<{
    id: string;
    treatment_type: string;
    cost: number;
  }>;
}

export default function CreateInvoiceModal({
  isOpen,
  onClose,
  onSubmit,
  patients,
  treatments,
}: CreateInvoiceModalProps) {
  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  });

  const handleSubmit = (data: InvoiceFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient_id">Patient</Label>
              <Select onValueChange={(value) => form.setValue('patient_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.profiles.first_name} {patient.profiles.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.patient_id && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.patient_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="treatment_id">Treatment</Label>
              <Select onValueChange={(value) => form.setValue('treatment_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a treatment" />
                </SelectTrigger>
                <SelectContent>
                  {treatments.map((treatment) => (
                    <SelectItem key={treatment.id} value={treatment.id}>
                      {treatment.treatment_type} - ${treatment.cost}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.treatment_id && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.treatment_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                step="0.01"
                {...form.register('amount', { valueAsNumber: true })}
              />
              {form.formState.errors.amount && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance_portion">Insurance Portion</Label>
              <Input
                type="number"
                step="0.01"
                {...form.register('insurance_portion', { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea {...form.register('notes')} />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}