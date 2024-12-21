export interface Practice {
  id: string;
  name: string;
  subscription_status: string;
  stripe_customer_id: string;
  license_key: string;
  subscription_tier: string;
  created_at: string;
  settings: Record<string, any>;
}

export interface User {
  id: string;
  role: 'admin' | 'dentist' | 'staff' | 'patient';
  practice_id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Patient {
  id: string;
  practice_id: string;
  user_id: string;
  medical_history: Record<string, any>;
  insurance_info: Record<string, any>;
}

export interface Appointment {
  id: string;
  practice_id: string;
  patient_id: string;
  dentist_id: string;
  datetime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}