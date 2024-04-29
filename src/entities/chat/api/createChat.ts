import { createEntity } from '@shared/index';
import { MaybeRef } from 'vue';

export default function createChat(
  input: CreateChatInput,
  body: MaybeRef<string>
) {
  return createEntity<Chat, CreateChatInput>('chat', body, {
    input,
  });
}
