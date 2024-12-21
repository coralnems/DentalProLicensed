import React from 'react';
import { formatDistanceToNow } from '@/utils/date';
import { Avatar } from '@/components/ui/avatar';
import type { ChatRoom } from '@/lib/api/chat/types';

interface ChatListProps {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export default function ChatList({ rooms, activeRoomId, onSelectRoom }: ChatListProps) {
  return (
    <div className="border-r h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 ${
              activeRoomId === room.id ? 'bg-blue-50' : ''
            }`}
          >
            <Avatar className="h-10 w-10 flex-shrink-0">
              {room.participants[0].avatar ? (
                <img src={room.participants[0].avatar} alt="" />
              ) : (
                <div className="bg-blue-500 h-full w-full flex items-center justify-center text-white">
                  {room.participants[0].name[0].toUpperCase()}
                </div>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {room.participants[0].name}
                </p>
                {room.lastMessage && (
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(room.lastMessage.timestamp)}
                  </span>
                )}
              </div>
              {room.lastMessage && (
                <p className="text-sm text-gray-500 truncate">
                  {room.lastMessage.content}
                </p>
              )}
            </div>
            {room.unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                {room.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}