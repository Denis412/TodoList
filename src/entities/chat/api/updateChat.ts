import { updateEntity } from '@shared/index';
import { MaybeRef } from 'vue';

export default function updateChat(
  id: string,
  input: UpdateChatInput,
  body: MaybeRef<string>
) {
  return updateEntity<Chat, UpdateChatInput>('chat', body, {
    id,
    input,
  });
}
