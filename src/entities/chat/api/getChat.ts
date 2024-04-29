import { getEntity } from '@shared/index';
import { MaybeRef } from 'vue';

export default function getChat(id: string, body: MaybeRef<string>) {
  return getEntity<Chat>('chat', body, id);
}
