import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

interface ChatContainerProps {
  messages: Message[];
  recipient: {
    name: string;
    avatar?: string;
    status?: 'online' | 'offline';
  };
  currentUser: string;
  onSendMessage: (content: string) => void;
  onStartCall?: () => void;
  onStartVideo?: () => void;
}

export default function ChatContainer({
  messages,
  recipient,
  currentUser,
  onSendMessage,
  onStartCall,
  onStartVideo
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader
        recipient={recipient}
        onStartCall={onStartCall}
        onStartVideo={onStartVideo}
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.sender === currentUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}