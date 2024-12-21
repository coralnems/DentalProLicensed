-- Create teledentistry sessions table
CREATE TABLE IF NOT EXISTS teledentistry_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id uuid NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('waiting', 'in-progress', 'completed')),
  start_time timestamptz,
  end_time timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create teledentistry messages table
CREATE TABLE IF NOT EXISTS teledentistry_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id uuid NOT NULL REFERENCES teledentistry_sessions(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE teledentistry_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teledentistry_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their teledentistry sessions"
  ON teledentistry_sessions
  FOR SELECT
  USING (
    appointment_id IN (
      SELECT id FROM appointments WHERE 
        dentist_id = auth.uid() OR 
        patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can view their teledentistry messages"
  ON teledentistry_messages
  FOR SELECT
  USING (
    session_id IN (
      SELECT id FROM teledentistry_sessions WHERE 
        appointment_id IN (
          SELECT id FROM appointments WHERE 
            dentist_id = auth.uid() OR 
            patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
        )
    )
  );

CREATE POLICY "Users can send messages in their sessions"
  ON teledentistry_messages
  FOR INSERT
  WITH CHECK (
    session_id IN (
      SELECT id FROM teledentistry_sessions WHERE 
        appointment_id IN (
          SELECT id FROM appointments WHERE 
            dentist_id = auth.uid() OR 
            patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
        )
    )
  );