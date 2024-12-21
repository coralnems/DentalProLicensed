/*
  # Add dental history to patients table

  1. Changes
    - Add dental_history column to patients table
    - Update existing RLS policies to include new column

  2. Security
    - Maintain existing RLS policies
    - Ensure dental history is protected like other medical data
*/

ALTER TABLE patients
ADD COLUMN IF NOT EXISTS dental_history jsonb DEFAULT '{}'::jsonb;

-- Update RLS policies to include dental_history
DROP POLICY IF EXISTS "Practice staff can read patients" ON patients;
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