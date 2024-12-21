import React from 'react';
import { formatDistanceToNow } from '@/utils/date';
import { Avatar } from '@/components/ui/avatar';

interface ChatMessageProps {
  message: {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
    avatar?: string;
  };
  isOwn: boolean;
}

export default function ChatMessage({ message, isOwn }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isOwn && (
        <Avatar className="h-8 w-8 mr-2">
          {message.avatar ? (
            <img src={message.avatar} alt={message.sender} />
          ) : (
            <div className="bg-blue-500 h-full w-full flex items-center justify-center text-white">
              {message.sender[0].toUpperCase()}
            </div>
          )}
        </Avatar>
      )}
      
      <div className={`max-w-[70%] ${isOwn ? 'order-1' : 'order-2'}`}>
        {!isOwn && (
          <div className="text-xs text-gray-500 mb-1">{message.sender}</div>
        )}
        <div
          className={`rounded-lg px-4 py-2 ${
            isOwn
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(message.timestamp)}
        </div>
      </div>
    </div>
  );
}