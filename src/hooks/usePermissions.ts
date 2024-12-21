import { useAuthStore } from '../store/authStore';

type Permission = 
  | 'manage_patients'
  | 'manage_appointments'
  | 'manage_billing'
  | 'view_medical_records'
  | 'manage_medical_records'
  | 'manage_practice';

const rolePermissions: Record<string, Permission[]> = {
  admin: [
    'manage_patients',
    'manage_appointments',
    'manage_billing',
    'view_medical_records',
    'manage_medical_records',
    'manage_practice',
  ],
  dentist: [
    'manage_patients',
    'manage_appointments',
    'view_medical_records',
    'manage_medical_records',
  ],
  staff: [
    'manage_patients',
    'manage_appointments',
    'manage_billing',
    'view_medical_records',
  ],
  patient: [
    'view_medical_records',
  ],
};

export function usePermissions() {
  const { user } = useAuthStore();

  const hasPermission = (permission: Permission): boolean => {
    if (!user?.role) return false;
    return rolePermissions[user.role]?.includes(permission) ?? false;
  };

  const can = {
    managePatients: hasPermission('manage_patients'),
    manageAppointments: hasPermission('manage_appointments'),
    manageBilling: hasPermission('manage_billing'),
    viewMedicalRecords: hasPermission('view_medical_records'),
    manageMedicalRecords: hasPermission('manage_medical_records'),
    managePractice: hasPermission('manage_practice'),
  };

  return { can, hasPermission };
}