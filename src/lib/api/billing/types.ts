export interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  method: 'credit_card' | 'cash' | 'insurance';
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  patient: {
    profiles: {
      first_name: string;
      last_name: string;
    };
  };
}

export interface InsuranceClaim {
  id: string;
  patient_id: string;
  amount: number;
  status: 'pending' | 'approved' | 'denied';
  submitted_date: string;
  insurance_info: {
    provider: string;
    policy_number: string;
  };
  patient: {
    profiles: {
      first_name: string;
      last_name: string;
    };
  };
}