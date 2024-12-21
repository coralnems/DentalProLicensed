-- Seed data for the dental practice management system

-- Insert practices
INSERT INTO public.practices (id, name, subscription_status, subscription_tier, created_at, settings)
VALUES
  ('pract_01', 'Smile Bright Dental', 'active', 'professional', NOW(), '{"theme": "light", "currency": "USD"}'),
  ('pract_02', 'Downtown Dental Care', 'active', 'basic', NOW(), '{"theme": "dark", "currency": "USD"}');

-- Insert profiles (users)
INSERT INTO public.profiles (id, role, practice_id, first_name, last_name, email, created_at)
VALUES
  -- Dentists
  ('usr_d1', 'dentist', 'pract_01', 'John', 'Smith', 'john.smith@example.com', NOW()),
  ('usr_d2', 'dentist', 'pract_01', 'Sarah', 'Johnson', 'sarah.j@example.com', NOW()),
  -- Staff
  ('usr_s1', 'staff', 'pract_01', 'Mike', 'Brown', 'mike.b@example.com', NOW()),
  ('usr_s2', 'staff', 'pract_01', 'Lisa', 'Davis', 'lisa.d@example.com', NOW()),
  -- Patients
  ('usr_p1', 'patient', 'pract_01', 'James', 'Wilson', 'james.w@example.com', NOW()),
  ('usr_p2', 'patient', 'pract_01', 'Emma', 'Taylor', 'emma.t@example.com', NOW()),
  ('usr_p3', 'patient', 'pract_01', 'Michael', 'Anderson', 'm.anderson@example.com', NOW()),
  ('usr_p4', 'patient', 'pract_01', 'Sophia', 'Martinez', 's.martinez@example.com', NOW()),
  ('usr_p5', 'patient', 'pract_01', 'William', 'Thomas', 'w.thomas@example.com', NOW()),
  ('usr_p6', 'patient', 'pract_01', 'Olivia', 'Garcia', 'o.garcia@example.com', NOW()),
  ('usr_p7', 'patient', 'pract_01', 'Ethan', 'Brown', 'e.brown@example.com', NOW()),
  ('usr_p8', 'patient', 'pract_01', 'Ava', 'Davis', 'a.davis@example.com', NOW()),
  ('usr_p9', 'patient', 'pract_01', 'Noah', 'Miller', 'n.miller@example.com', NOW()),
  ('usr_p10', 'patient', 'pract_01', 'Isabella', 'Wilson', 'i.wilson@example.com', NOW());

-- Insert patients
INSERT INTO public.patients (id, practice_id, user_id, medical_history, insurance_info, created_at)
VALUES
  ('pat_01', 'pract_01', 'usr_p1', '{"allergies": ["penicillin"], "conditions": ["hypertension"]}', '{"provider": "BlueCross", "policy_number": "BC123456"}', NOW()),
  ('pat_02', 'pract_01', 'usr_p2', '{"allergies": [], "conditions": ["diabetes"]}', '{"provider": "Aetna", "policy_number": "AE789012"}', NOW()),
  ('pat_03', 'pract_01', 'usr_p3', '{"allergies": ["latex"], "conditions": []}', '{"provider": "UnitedHealth", "policy_number": "UH345678"}', NOW()),
  ('pat_04', 'pract_01', 'usr_p4', '{"allergies": [], "conditions": ["asthma"]}', '{"provider": "Cigna", "policy_number": "CI901234"}', NOW()),
  ('pat_05', 'pract_01', 'usr_p5', '{"allergies": ["aspirin"], "conditions": []}', '{"provider": "Humana", "policy_number": "HU567890"}', NOW()),
  ('pat_06', 'pract_01', 'usr_p6', '{"allergies": [], "conditions": ["arthritis"]}', '{"provider": "Kaiser", "policy_number": "KP123789"}', NOW()),
  ('pat_07', 'pract_01', 'usr_p7', '{"allergies": ["sulfa"], "conditions": []}', '{"provider": "Anthem", "policy_number": "AN456012"}', NOW()),
  ('pat_08', 'pract_01', 'usr_p8', '{"allergies": [], "conditions": ["hypertension"]}', '{"provider": "MetLife", "policy_number": "ML789345"}', NOW()),
  ('pat_09', 'pract_01', 'usr_p9', '{"allergies": ["codeine"], "conditions": []}', '{"provider": "Delta", "policy_number": "DL012678"}', NOW()),
  ('pat_10', 'pract_01', 'usr_p10', '{"allergies": [], "conditions": ["diabetes"]}', '{"provider": "Guardian", "policy_number": "GU345901"}', NOW());

-- Insert appointments
INSERT INTO public.appointments (id, practice_id, patient_id, dentist_id, datetime, status, notes, created_at)
VALUES
  ('apt_01', 'pract_01', 'pat_01', 'usr_d1', NOW() + INTERVAL '1 day', 'scheduled', 'Regular checkup', NOW()),
  ('apt_02', 'pract_01', 'pat_02', 'usr_d2', NOW() + INTERVAL '2 days', 'scheduled', 'Cavity filling', NOW()),
  ('apt_03', 'pract_01', 'pat_03', 'usr_d1', NOW() + INTERVAL '3 days', 'scheduled', 'Root canal', NOW()),
  ('apt_04', 'pract_01', 'pat_04', 'usr_d2', NOW() + INTERVAL '4 days', 'scheduled', 'Teeth cleaning', NOW()),
  ('apt_05', 'pract_01', 'pat_05', 'usr_d1', NOW() + INTERVAL '5 days', 'scheduled', 'Crown fitting', NOW()),
  ('apt_06', 'pract_01', 'pat_06', 'usr_d2', NOW() + INTERVAL '6 days', 'scheduled', 'Consultation', NOW()),
  ('apt_07', 'pract_01', 'pat_07', 'usr_d1', NOW() + INTERVAL '7 days', 'scheduled', 'Wisdom tooth extraction', NOW()),
  ('apt_08', 'pract_01', 'pat_08', 'usr_d2', NOW() + INTERVAL '8 days', 'scheduled', 'Regular checkup', NOW()),
  ('apt_09', 'pract_01', 'pat_09', 'usr_d1', NOW() + INTERVAL '9 days', 'scheduled', 'Teeth whitening', NOW()),
  ('apt_10', 'pract_01', 'pat_10', 'usr_d2', NOW() + INTERVAL '10 days', 'scheduled', 'Dental implant consultation', NOW());