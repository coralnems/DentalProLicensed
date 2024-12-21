import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { usePermissions } from '../hooks/usePermissions';
import AppointmentCalendar from '../components/Calendar/AppointmentCalendar';
import Modal from '../components/Modal/Modal';
import AppointmentForm from '../components/Forms/AppointmentForm';
import NewPatientForm from '../components/Forms/NewPatientForm';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import Alert from '../components/Alerts/Alert';
import { formatDateTime } from '../utils/date';
import { createNewPatient } from '../lib/api/patients/mutations';

export default function Appointments() {
  const location = useLocation();
  const { appointments, isLoading, error, createAppointment } = useAppointments();
  const { can } = usePermissions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState('');

  // Handle opening new appointment modal from dashboard
  useEffect(() => {
    if (location.state?.openNewAppointment) {
      setIsAddModalOpen(true);
      // Clear the state to prevent reopening on navigation
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleAddAppointment = async (data: any) => {
    try {
      await createAppointment(data);
      setIsAddModalOpen(false);
      setSuccessMessage('Appointment scheduled successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to schedule appointment:', error);
    }
  };

  const handleNewPatient = async (data: any) => {
    try {
      await createNewPatient(data);
      setIsNewPatientModalOpen(false);
      setSuccessMessage('New patient registered and appointment scheduled');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to register new patient:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return <Alert type="error" message="Failed to load appointments" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
        {can.manageAppointments && (
          <div className="flex space-x-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Existing Patient
            </button>
            <button
              onClick={() => setIsNewPatientModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              New Patient
            </button>
          </div>
        )}
      </div>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Upcoming Appointments
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {appointment.patient.profiles.first_name}{' '}
                          {appointment.patient.profiles.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDateTime(appointment.datetime)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {appointments.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No upcoming appointments
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg">
          <AppointmentCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            appointments={appointments}
          />
        </div>
      </div>

      <Modal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
        title="Register New Patient & Schedule Appointment"
      >
        <NewPatientForm
          onSubmit={handleNewPatient}
          onCancel={() => setIsNewPatientModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Appointment"
      >
        <AppointmentForm
          onSubmit={handleAddAppointment}
          initialData={{ datetime: selectedDate.toISOString() }}
          patients={[]} // TODO: Add patients list
          dentists={[]} // TODO: Add dentists list
        />
      </Modal>
    </div>
  );
}