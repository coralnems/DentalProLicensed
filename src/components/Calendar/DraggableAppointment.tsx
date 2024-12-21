import React from 'react';
import { useDrag } from 'react-dnd';
import { Calendar, Clock } from 'lucide-react';

interface DraggableAppointmentProps {
  id: string;
  patientName: string;
  time: string;
  type: string;
}

export default function DraggableAppointment({
  id,
  patientName,
  time,
  type,
}: DraggableAppointmentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'appointment',
    item: { id, patientName, time, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 rounded-md mb-2 cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${
        type === 'checkup' ? 'bg-blue-100' :
        type === 'cleaning' ? 'bg-green-100' :
        type === 'procedure' ? 'bg-yellow-100' :
        'bg-red-100'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">{patientName}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
    </div>
  );
}