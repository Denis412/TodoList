import { paginateEntity } from '@shared/index';
import { MaybeRef } from 'vue';
import { PaginatorPayload } from '@shared/types';

export default function paginateChat(
  paginator: PaginatorPayload,
  body: MaybeRef<string>
) {
  return paginateEntity<Chat>('chat', body, paginator);
}
