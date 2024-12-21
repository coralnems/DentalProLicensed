import { supabase } from '../../supabase/client';

export async function getInvoices() {
  const { data, error } = await supabase
    .from('billing')
    .select(`
      *,
      patient:patient_id (
        profiles:user_id (
          first_name,
          last_name,
          email
        )
      ),
      treatment:treatment_id (
        treatment_type,
        description
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getInvoice(invoiceId: string) {
  const { data, error } = await supabase
    .from('billing')
    .select(`
      *,
      patient:patient_id (
        profiles:user_id (
          first_name,
          last_name,
          email
        )
      ),
      treatment:treatment_id (
        treatment_type,
        description
      )
    `)
    .eq('id', invoiceId)
    .single();

  if (error) throw error;
  return data;
}

export async function generateInvoicePDF(invoiceData: any) {
  // This would integrate with a PDF generation service
  // For now, we'll just return a formatted object
  return {
    invoiceNumber: invoiceData.id,
    date: new Date(invoiceData.created_at).toLocaleDateString(),
    patientName: `${invoiceData.patient.profiles.first_name} ${invoiceData.patient.profiles.last_name}`,
    amount: invoiceData.amount,
    items: [
      {
        description: invoiceData.treatment?.treatment_type || 'General Service',
        amount: invoiceData.amount
      }
    ]
  };
}