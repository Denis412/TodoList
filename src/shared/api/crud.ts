import { sendMutation, sendQuery } from './queryFunctions';
import { QueryActions } from './getQuerySchema';
import {
  CreatePayload,
  DeleteResult,
  PaginatorPayload,
  PaginatorResult,
  UpdatePayload,
} from '@shared/types';
import type { MaybeRef } from 'vue';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@vue/apollo-composable';
import type { ReactiveFunction } from '@vue/apollo-composable/dist/util/ReactiveFunction';

export function createEntity<T, I>(
  entity: string,
  body: MaybeRef<string>,
  payload: CreatePayload<I>,
  options?: MaybeRef<UseMutationOptions> | ReactiveFunction<UseMutationOptions>
) {
  return sendMutation<T>(
    {
      action: QueryActions.CREATE,
      entity,
      body,
    },
    () => ({
      ...options,
      variables: payload,
    })
  );
}

export function updateEntity<T, I>(
  entity: string,
  body: MaybeRef<string>,
  payload: UpdatePayload<I>,
  options?: MaybeRef<UseMutationOptions> | ReactiveFunction<UseMutationOptions>
) {
  return sendMutation<T>(
    {
      action: QueryActions.UPDATE,
      entity,
      body,
    },
    () => ({
      ...options,
      variables: payload,
    })
  );
}

export function deleteEntity(
  entity: string,
  id: string,
  options?: MaybeRef<UseMutationOptions> | ReactiveFunction<UseMutationOptions>
) {
  return sendMutation<DeleteResult>(
    {
      action: QueryActions.DELETE,
      entity,
      body: '{ recordId }',
    },
    () => ({
      ...options,
      variables: {
        id,
      },
    })
  );
}

export function getEntity<TResult>(
  entity: string,
  body: MaybeRef<string>,
  id: string,
  options?: MaybeRef<UseQueryOptions> | ReactiveFunction<UseQueryOptions>
) {
  return sendQuery<TResult>(
    {
      action: QueryActions.GET,
      entity,
      body,
    },
    {
      id,
    },
    options
  );
}

export function paginateEntity<TResult>(
  entity: string,
  body: MaybeRef<string>,
  paginator: PaginatorPayload,
  options?: MaybeRef<UseQueryOptions> | ReactiveFunction<UseQueryOptions>
) {
  return sendQuery<PaginatorResult<TResult>>(
    {
      action: QueryActions.PAGINATE,
      entity,
      body,
    },
    paginator,
    options
  );
}
