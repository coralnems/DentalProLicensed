import React from 'react';
import { Phone, Video, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface ChatHeaderProps {
  recipient: {
    name: string;
    avatar?: string;
    status?: 'online' | 'offline';
  };
  onStartCall?: () => void;
  onStartVideo?: () => void;
  onViewInfo?: () => void;
}

export default function ChatHeader({ 
  recipient,
  onStartCall,
  onStartVideo,
  onViewInfo
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-3">
          {recipient.avatar ? (
            <img src={recipient.avatar} alt={recipient.name} />
          ) : (
            <div className="bg-blue-500 h-full w-full flex items-center justify-center text-white">
              {recipient.name[0].toUpperCase()}
            </div>
          )}
        </Avatar>
        <div>
          <h3 className="font-medium">{recipient.name}</h3>
          <span className="text-xs text-gray-500">
            {recipient.status === 'online' ? 'Active now' : 'Offline'}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {onStartCall && (
          <Button variant="ghost" size="icon" onClick={onStartCall}>
            <Phone className="h-5 w-5" />
          </Button>
        )}
        {onStartVideo && (
          <Button variant="ghost" size="icon" onClick={onStartVideo}>
            <Video className="h-5 w-5" />
          </Button>
        )}
        {onViewInfo && (
          <Button variant="ghost" size="icon" onClick={onViewInfo}>
            <Info className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}