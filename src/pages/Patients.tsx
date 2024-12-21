import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import { usePermissions } from '../hooks/usePermissions';
import { useSearch } from '../hooks/useSearch';
import { usePagination } from '../hooks/usePagination';
import SearchInput from '../components/Search/SearchInput';
import Pagination from '../components/Pagination/Pagination';
import Modal from '../components/Modal/Modal';
import PatientForm from '../components/Forms/PatientForm';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import Alert from '../components/Alerts/Alert';
import { Button } from '@/components/ui/button';

export default function Patients() {
  const navigate = useNavigate();
  const { patients, isLoading, error, createPatient } = usePatients();
  const { can } = usePermissions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { searchTerm, filteredItems, handleSearch } = useSearch(
    patients,
    ['profiles.first_name', 'profiles.last_name', 'profiles.email']
  );

  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(filteredItems);

  const handleAddPatient = async (data: any) => {
    try {
      await createPatient(data);
      setIsAddModalOpen(false);
      setSuccessMessage('Patient added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to add patient:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return <Alert type="error" message="Failed to load patients" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
        {can.managePatients && (
          <div className="flex space-x-3">
            <Button
              onClick={() => navigate('/patients/register')}
              variant="default"
            >
              New Patient Registration
            </Button>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="outline"
            >
              Quick Add
            </Button>
          </div>
        )}
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
}