import { useMemo } from 'react';
import { 
  Activity, Users, Calendar, FileText, Settings, 
  CreditCard, Brain, ClipboardList, FileSignature,
  CircleDot, Film, TrendingUp, Receipt, DollarSign,
  MessageSquare, Bell, Stethoscope, UserPlus, 
  CalendarClock, FileBarChart // Changed from FileChart to FileBarChart
} from 'lucide-react';

export function useNavigation() {
  const navigationItems = useMemo(() => [
    { name: 'Dashboard', href: '/', icon: Activity },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Medical Records', href: '/records', icon: FileText },
    { name: 'Digital Forms', href: '/forms', icon: FileSignature },
    { name: '3D Teeth Model', href: '/teeth-model', icon: CircleDot },
    { name: 'DICOM Viewer', href: '/dicom', icon: Film },
    { name: 'AI Analysis', href: '/ai-analysis', icon: Brain },
    { name: 'Analytics AI', href: '/analytics', icon: TrendingUp },
    { name: 'Treatment Plans', href: '/treatments', icon: ClipboardList },
    { name: 'Patient Portal', href: '/portal', icon: UserPlus },
    { name: 'Teledentistry', href: '/teledentistry', icon: Stethoscope },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Scheduling', href: '/scheduling', icon: CalendarClock },
    { name: 'Reports', href: '/reports', icon: FileBarChart }, // Updated icon
    { name: 'Billing', href: '/billing', icon: Receipt },
    { name: 'Payments', href: '/billing/payments', icon: DollarSign },
    { name: 'Insurance Claims', href: '/billing/claims', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
  ], []);

  return { navigationItems };
}