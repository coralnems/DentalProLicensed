import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createSubscription(priceId: string) {
  const { data: { session_id }, error } = await supabase
    .functions.invoke('create-subscription', {
      body: { priceId },
    });

  if (error) throw error;

  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to load');

  const { error: stripeError } = await stripe.redirectToCheckout({
    sessionId: session_id,
  });

  if (stripeError) throw stripeError;
}

export async function updateSubscription(subscriptionId: string, priceId: string) {
  const { error } = await supabase
    .functions.invoke('update-subscription', {
      body: { subscriptionId, priceId },
    });

  if (error) throw error;
}

export async function cancelSubscription(subscriptionId: string) {
  const { error } = await supabase
    .functions.invoke('cancel-subscription', {
      body: { subscriptionId },
    });

  if (error) throw error;
}

export async function getInvoices(practiceId: string) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('practice_id', practiceId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}