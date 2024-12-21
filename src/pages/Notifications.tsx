import React from 'react';
import { Bell, Calendar, FileText, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const notifications = [
  {
    id: 1,
    type: 'appointment',
    title: 'New Appointment Request',
    message: 'John Smith requested an appointment for tomorrow at 2:30 PM',
    time: '5 minutes ago',
    icon: Calendar,
    color: 'text-blue-500'
  },
  {
    id: 2,
    type: 'record',
    title: 'Medical Record Updated',
    message: 'Dr. Johnson updated Sarah Wilson\'s medical records',
    time: '1 hour ago',
    icon: FileText,
    color: 'text-green-500'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Treatment Plan Due',
    message: 'Treatment plan review needed for Michael Brown',
    time: '2 hours ago',
    icon: AlertCircle,
    color: 'text-yellow-500'
  }
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <Button variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start space-x-4">
              <div className={`${notification.color} p-2 rounded-full bg-gray-50`}>
                <notification.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}