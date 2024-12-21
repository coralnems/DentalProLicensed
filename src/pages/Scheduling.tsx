import React from 'react';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AppointmentCalendar from '@/components/Calendar/AppointmentCalendar';

export default function Scheduling() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // Mock appointments data
  const appointments = [
    {
      id: 'apt1',
      datetime: new Date().toISOString(),
      patient: {
        profiles: {
          first_name: 'John',
          last_name: 'Smith'
        }
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Scheduling</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-lg font-medium">8</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Available Slots</p>
                <p className="text-lg font-medium">12</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-yellow-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-lg font-medium">45</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="md:col-span-2">
          <AppointmentCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            appointments={appointments}
          />
        </div>
      </div>
    </div>
  );
}