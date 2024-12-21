import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPatients,
  getPatient,
} from '../lib/api/patients/queries';
import {
  createPatient,
  updatePatient,
  deletePatient,
} from '../lib/api/patients/mutations';
import { useAuthStore } from '../store/authStore';

export function usePatients() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const patientsQuery = useQuery({
    queryKey: ['patients', user?.practice_id],
    queryFn: () => getPatients(user?.practice_id!),
    enabled: !!user?.practice_id,
  });

  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  const updatePatientMutation = useMutation({
    mutationFn: ({ id, data }) => updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  const deletePatientMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  return {
    patients: patientsQuery.data ?? [],
    isLoading: patientsQuery.isLoading,
    error: patientsQuery.error,
    createPatient: createPatientMutation.mutate,
    updatePatient: updatePatientMutation.mutate,
    deletePatient: deletePatientMutation.mutate,
  };
}