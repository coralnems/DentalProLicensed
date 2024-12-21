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
      license_payments: {
        Row: {
          id: string
          license_id: string
          amount: number
          payment_type: string
          payment_method: string
          transaction_id: string
          status: string
          payment_date: string
          created_at: string
        }
        Insert: {
          id?: string
          license_id: string
          amount: number
          payment_type: string
          payment_method: string
          transaction_id?: string
          status: string
          payment_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          license_id?: string
          amount?: number
          payment_type?: string
          payment_method?: string
          transaction_id?: string
          status?: string
          payment_date?: string
          created_at?: string
        }
      }
      license_users: {
        Row: {
          id: string
          license_id: string
          user_id: string
          status: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          license_id: string
          user_id: string
          status: string
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          license_id?: string
          user_id?: string
          status?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      licenses: {
        Row: {
          id: string
          practice_id: string
          status: string
          type: string
          max_users: number
          current_users: number
          initial_fee: number
          monthly_fee: number
          start_date: string
          end_date: string
          last_billing_date: string
          next_billing_date: string
          license_key: string
          payment_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          practice_id: string
          status: string
          type: string
          max_users: number
          current_users?: number
          initial_fee: number
          monthly_fee: number
          start_date: string
          end_date: string
          last_billing_date?: string
          next_billing_date?: string
          license_key: string
          payment_status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          practice_id?: string
          status?: string
          type?: string
          max_users?: number
          current_users?: number
          initial_fee?: number
          monthly_fee?: number
          start_date?: string
          end_date?: string
          last_billing_date?: string
          next_billing_date?: string
          license_key?: string
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      practices: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          address: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          address?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          address?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}