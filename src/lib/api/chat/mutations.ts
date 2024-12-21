import { supabase } from '../../supabase/client';
import type { ChatMessage } from './types';

export async function sendMessage(
  roomId: string,
  senderId: string,
  content: string,
  attachments?: File[]
): Promise<ChatMessage> {
  // First, upload any attachments
  const uploadedAttachments = attachments ? await Promise.all(
    attachments.map(async (file) => {
      const { data, error } = await supabase
        .storage
        .from('chat-attachments')
        .upload(`${roomId}/${Date.now()}-${file.name}`, file);

      if (error) throw error;
      return {
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: data.path,
        name: file.name
      };
    })
  ) : [];

  // Then create the message
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      room_id: roomId,
      sender_id: senderId,
      content,
      attachments: uploadedAttachments
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createChatRoom(
  participantIds: string[],
  type: 'direct' | 'group' = 'direct'
): Promise<string> {
  const { data, error } = await supabase
    .from('chat_rooms')
    .insert({
      type,
      participant_ids: participantIds
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}