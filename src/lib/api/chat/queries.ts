import { supabase } from '../../supabase/client';
import type { ChatMessage, ChatRoom } from './types';

export async function getChatRooms(userId: string): Promise<ChatRoom[]> {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select(`
      *,
      participants:chat_participants(user_id, profile:profiles(*)),
      last_message:chat_messages(*)
    `)
    .contains('participant_ids', [userId])
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getChatMessages(roomId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select(`
      *,
      sender:profiles(*)
    `)
    .eq('room_id', roomId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function markMessagesAsRead(roomId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('chat_messages')
    .update({ read: true })
    .eq('room_id', roomId)
    .eq('recipient_id', userId)
    .eq('read', false);

  if (error) throw error;
}