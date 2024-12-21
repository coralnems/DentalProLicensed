import { supabase } from '../../supabase/client';

export async function createInvoice(invoiceData: any) {
  const { data, error } = await supabase
    .from('billing')
    .insert([{
      ...invoiceData,
      status: 'pending',
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
  const { data, error } = await supabase
    .from('billing')
    .update({ status })
    .eq('id', invoiceId)
    .select()
    .single();

  if (error) throw error;
  return data;
}