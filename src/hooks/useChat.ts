import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChatRooms, getChatMessages, sendMessage } from '@/lib/api/chat/queries';
import type { ChatMessage, ChatRoom } from '@/lib/api/chat/types';
import { useAuthStore } from '@/store/authStore';

export function useChat(roomId?: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  const [activeRoom, setActiveRoom] = useState<string | null>(roomId || null);

  const {
    data: rooms = [],
    isLoading: loadingRooms
  } = useQuery({
    queryKey: ['chat-rooms', user?.id],
    queryFn: () => getChatRooms(user?.id!),
    enabled: !!user?.id
  });

  const {
    data: messages = [],
    isLoading: loadingMessages
  } = useQuery({
    queryKey: ['chat-messages', activeRoom],
    queryFn: () => getChatMessages(activeRoom!),
    enabled: !!activeRoom
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({ content, attachments }: { content: string, attachments?: File[] }) =>
      sendMessage(activeRoom!, user?.id!, content, attachments),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages', activeRoom] });
      queryClient.invalidateQueries({ queryKey: ['chat-rooms', user?.id] });
    }
  });

  return {
    rooms,
    messages,
    activeRoom,
    setActiveRoom,
    sendMessage: sendMessageMutation.mutate,
    isLoading: loadingRooms || loadingMessages
  };
}