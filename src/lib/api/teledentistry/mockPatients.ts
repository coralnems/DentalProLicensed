```typescript
export const mockPatients = [
  {
    id: 'pat-1',
    name: 'John Smith',
    appointmentTime: '2:30 PM',
    reason: 'Regular Checkup',
    waitingSince: '2:25 PM'
  },
  {
    id: 'pat-2',
    name: 'Sarah Johnson',
    appointmentTime: '3:00 PM',
    reason: 'Follow-up Consultation',
    waitingSince: '2:55 PM'
  },
  {
    id: 'pat-3',
    name: 'Michael Brown',
    appointmentTime: '3:30 PM',
    reason: 'Tooth Sensitivity',
    waitingSince: '3:25 PM'
  }
];

export const mockAppointmentHistory = [
  {
    id: 'apt-hist-1',
    patientName: 'John Smith',
    date: '2024-03-15',
    duration: '25 minutes',
    notes: 'Discussed treatment options for cavity'
  },
  {
    id: 'apt-hist-2',
    patientName: 'Sarah Johnson',
    date: '2024-03-14',
    duration: '30 minutes',
    notes: 'Follow-up on crown procedure'
  }
];
```