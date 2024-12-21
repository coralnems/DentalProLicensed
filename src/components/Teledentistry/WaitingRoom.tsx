import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WaitingRoomProps {
  patientName: string;
  appointmentTime: string;
  onJoinCall: () => void;
}

export default function WaitingRoom({ patientName, appointmentTime, onJoinCall }: WaitingRoomProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Waiting Room</h2>
        <p className="text-gray-600 mb-6">
          Your teledentistry appointment with {patientName} is scheduled for {appointmentTime}
        </p>
        <Button onClick={onJoinCall} className="w-full">
          Join Call
        </Button>
      </div>
    </div>
  );
}