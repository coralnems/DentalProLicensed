import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import PatientRegistration from './pages/patients/Registration';
import Appointments from './pages/Appointments';
import Records from './pages/Records';
import DigitalForms from './pages/DigitalForms';
import TeethModel from './pages/TeethModel';
import DicomViewer from './pages/DicomViewer';
import AIAnalysis from './pages/AIAnalysis';
import AnalyticsAI from './pages/AnalyticsAI';
import TreatmentPlans from './pages/TreatmentPlans';
import Billing from './pages/Billing';
import Payments from './pages/billing/Payments';
import InsuranceClaims from './pages/billing/InsuranceClaims';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Teledentistry from './pages/Teledentistry';
import Notifications from './pages/Notifications';
import Scheduling from './pages/Scheduling';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useAuth } from './hooks/useAuth';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/register" element={<PatientRegistration />} />
              <Route path="patients/:id" element={<PatientDetails />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="records" element={<Records />} />
              <Route path="forms" element={<DigitalForms />} />
              <Route path="teeth-model" element={<TeethModel />} />
              <Route path="dicom" element={<DicomViewer />} />
              <Route path="treatments" element={<TreatmentPlans />} />
              <Route path="ai-analysis" element={<AIAnalysis />} />
              <Route path="analytics" element={<AnalyticsAI />} />
              <Route path="chat" element={<Chat />} />
              <Route path="teledentistry" element={<Teledentistry />} />
              <Route path="teledentistry/:appointmentId" element={<Teledentistry />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="scheduling" element={<Scheduling />} />
              <Route path="billing" element={<Billing />} />
              <Route path="billing/payments" element={<Payments />} />
              <Route path="billing/claims" element={<InsuranceClaims />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}