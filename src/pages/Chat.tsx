import React from 'react';
import ChatContainer from '@/components/Chat/ChatContainer';
import { mockMessages } from '@/lib/api/teledentistry/mockData';

export default function Chat() {
  const [messages, setMessages] = React.useState(mockMessages);

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

  return (
    <div className="h-[calc(100vh-2rem)] bg-white rounded-lg shadow-sm overflow-hidden">
      <ChatContainer
        messages={messages}
        recipient={{
          name: 'John Smith',
          status: 'online'
        }}
        currentUser="Dr. Sarah Johnson"
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}