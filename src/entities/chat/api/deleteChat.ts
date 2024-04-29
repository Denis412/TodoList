import { deleteEntity } from '@shared/index';

export default function createChat(id: string) {
  return deleteEntity('chat', id);
}
