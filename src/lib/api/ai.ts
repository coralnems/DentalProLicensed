import { supabase } from '../supabase';

export async function analyzeXRay(imageUrl: string) {
  // This would integrate with OpenAI's API for image analysis
  const response = await fetch('/api/ai/analyze-xray', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrl }),
  });

  if (!response.ok) throw new Error('Failed to analyze X-ray');
  return response.json();
}

export async function getTreatmentRecommendation(
  patientId: string,
  condition: string
) {
  // This would integrate with OpenAI's API for treatment recommendations
  const response = await fetch('/api/ai/treatment-recommendation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ patientId, condition }),
  });

  if (!response.ok) throw new Error('Failed to get treatment recommendation');
  return response.json();
}

export async function getProcedureGuidance(procedureType: string) {
  // This would integrate with OpenAI's API for real-time procedure guidance
  const response = await fetch('/api/ai/procedure-guidance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ procedureType }),
  });

  if (!response.ok) throw new Error('Failed to get procedure guidance');
  return response.json();
}