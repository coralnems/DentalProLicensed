export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string
          practice_id: string
          patient_id: string
          dentist_id: string
          datetime: string
          status: 'scheduled' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          practice_id: string
          patient_id: string
          dentist_id: string
          datetime: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          practice_id?: string
          patient_id?: string
          dentist_id?: string
          datetime?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          practice_id: string
          user_id: string
          medical_history: Json
          insurance_info: Json
          created_at: string
        }
        Insert: {
          id?: string
          practice_id: string
          user_id: string
          medical_history?: Json
          insurance_info?: Json
          created_at?: string
        }
        Update: {
          id?: string
          practice_id?: string
          user_id?: string
          medical_history?: Json
          insurance_info?: Json
          created_at?: string
        }
      }
      practices: {
        Row: {
          id: string
          name: string
          subscription_status: string
          stripe_customer_id: string | null
          license_key: string
          subscription_tier: string
          created_at: string
          settings: Json
        }
        Insert: {
          id?: string
          name: string
          subscription_status?: string
          stripe_customer_id?: string | null
          license_key?: string
          subscription_tier?: string
          created_at?: string
          settings?: Json
        }
        Update: {
          id?: string
          name?: string
          subscription_status?: string
          stripe_customer_id?: string | null
          license_key?: string
          subscription_tier?: string
          created_at?: string
          settings?: Json
        }
      }
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'dentist' | 'staff' | 'patient'
          practice_id: string | null
          first_name: string
          last_name: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          role?: 'admin' | 'dentist' | 'staff' | 'patient'
          practice_id?: string | null
          first_name: string
          last_name: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'dentist' | 'staff' | 'patient'
          practice_id?: string | null
          first_name?: string
          last_name?: string
          email?: string
          created_at?: string
        }
      }
    }
  }
}