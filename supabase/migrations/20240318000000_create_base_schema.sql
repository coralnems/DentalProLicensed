/*
  # Initial Schema Setup for Dental Practice Management

  1. New Tables
    - `practices` - Practice/clinic information
    - `profiles` - User profiles with role-based access
    - `patients` - Patient records
    - `appointments` - Appointment scheduling
    - `medical_records` - Patient medical history
    - `treatments` - Treatment records
    - `billing` - Billing and payment records

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Implement row-level security for data isolation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Practices table
CREATE TABLE IF NOT EXISTS practices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  subscription_status text NOT NULL DEFAULT 'trial',
  stripe_customer_id text,
  license_key text UNIQUE,
  subscription_tier text NOT NULL DEFAULT 'basic',
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE practices ENABLE ROW LEVEL SECURITY;

-- Profiles table (users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'dentist', 'staff', 'patient')),
  practice_id uuid REFERENCES practices ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_id uuid NOT NULL REFERENCES practices ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  medical_history jsonb DEFAULT '{}'::jsonb,
  insurance_info jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(practice_id, user_id)
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_id uuid NOT NULL REFERENCES practices ON DELETE CASCADE,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  dentist_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  datetime timestamptz NOT NULL,
  duration interval NOT NULL DEFAULT '30 minutes',
  type text NOT NULL CHECK (type IN ('checkup', 'cleaning', 'procedure', 'emergency')),
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Medical Records table
CREATE TABLE IF NOT EXISTS medical_records (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  record_type text NOT NULL,
  record_date timestamptz NOT NULL,
  details jsonb NOT NULL,
  attachments text[],
  created_by uuid NOT NULL REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Treatments table
CREATE TABLE IF NOT EXISTS treatments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  treatment_type text NOT NULL,
  description text NOT NULL,
  cost decimal(10,2) NOT NULL,
  insurance_coverage decimal(10,2),
  status text NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

-- Billing table
CREATE TABLE IF NOT EXISTS billing (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_id uuid NOT NULL REFERENCES practices ON DELETE CASCADE,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  treatment_id uuid REFERENCES treatments(id) ON DELETE SET NULL,
  amount decimal(10,2) NOT NULL,
  insurance_portion decimal(10,2),
  patient_portion decimal(10,2),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'partially_paid', 'cancelled')),
  payment_date timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE billing ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Practices policies
CREATE POLICY "Practices visible to authenticated users of the practice"
  ON practices FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT practice_id FROM profiles WHERE id = auth.uid()
  ));

-- Profiles policies
CREATE POLICY "Users can read profiles in their practice"
  ON profiles FOR SELECT
  TO authenticated
  USING (practice_id IN (
    SELECT practice_id FROM profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Patients policies
CREATE POLICY "Practice staff can read patients"
  ON patients FOR SELECT
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'dentist', 'staff')
    )
    OR user_id = auth.uid()
  );

-- Appointments policies
CREATE POLICY "Practice staff can manage appointments"
  ON appointments FOR ALL
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'dentist', 'staff')
    )
  );

CREATE POLICY "Patients can view their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

-- Medical Records policies
CREATE POLICY "Practice staff can manage medical records"
  ON medical_records FOR ALL
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patients 
      WHERE practice_id IN (
        SELECT practice_id FROM profiles 
        WHERE id = auth.uid() AND role IN ('admin', 'dentist')
      )
    )
  );

CREATE POLICY "Patients can view their medical records"
  ON medical_records FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

-- Treatments policies
CREATE POLICY "Practice staff can manage treatments"
  ON treatments FOR ALL
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patients 
      WHERE practice_id IN (
        SELECT practice_id FROM profiles 
        WHERE id = auth.uid() AND role IN ('admin', 'dentist', 'staff')
      )
    )
  );

-- Billing policies
CREATE POLICY "Practice staff can manage billing"
  ON billing FOR ALL
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Patients can view their billing"
  ON billing FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );