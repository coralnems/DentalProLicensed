import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  practice: string | null;
  setUser: (user: User | null) => void;
  setPractice: (practiceId: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  practice: null,
  setUser: (user) => set({ user }),
  setPractice: (practice) => set({ practice }),
  logout: () => set({ user: null, practice: null }),
}));