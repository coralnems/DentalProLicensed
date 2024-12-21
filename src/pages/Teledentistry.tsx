import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoCall from '@/components/Teledentistry/VideoCall';
import WaitingRoom from '@/components/Teledentistry/WaitingRoom';
import ChatContainer from '@/components/Chat/ChatContainer';
import Notes from '@/components/Teledentistry/Notes';
import ConnectionStatus from '@/components/Teledentistry/ConnectionStatus';
import { useConnection } from '@/lib/teledentistry';
import { mockMessages, mockSession } from '@/lib/api/teledentistry/mockData';
import { saveSessionNotes } from '@/lib/api/teledentistry';

export default function Teledentistry() {
  const [isInCall, setIsInCall] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const { appointmentId } = useParams();
  const connection = useConnection();

  // Mock appointment data - in production, fetch from API
  const appointment = {
    patientName: "John Smith",
    appointmentTime: "2:30 PM",
    roomId: appointmentId || "test-room"
  };

  const handleEndCall = () => {
    setIsInCall(false);
    connection.resetConnection();
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Dr. Sarah Johnson',
      content,
      timestamp: new Date(),
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSaveNotes = async (notes: string) => {
    try {
      await saveSessionNotes(mockSession.id, notes);
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] bg-white rounded-lg shadow-sm overflow-hidden">
      <ConnectionStatus {...connection} />
      
      <div className="grid grid-cols-4 h-full">
        <div className="col-span-3 border-r">
          {isInCall ? (
            <VideoCall
              roomId={appointment.roomId}
              onEndCall={handleEndCall}
            />
          ) : (
            <WaitingRoom
              patientName={appointment.patientName}
              appointmentTime={appointment.appointmentTime}
              onJoinCall={() => setIsInCall(true)}
            />
          )}
        </div>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-hidden">
            <ChatContainer
              messages={messages}
              recipient={{
                name: appointment.patientName,
                status: 'online'
              }}
              currentUser="Dr. Sarah Johnson"
              onSendMessage={handleSendMessage}
              onStartCall={() => setIsInCall(true)}
              onStartVideo={() => setIsInCall(true)}
            />
          </div>
          {isInCall && (
            <div className="h-1/3 border-t">
              <Notes
                initialNotes={mockSession.notes}
                onSave={handleSaveNotes}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}