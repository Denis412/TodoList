/* eslint-disable @typescript-eslint/no-explicit-any */

import GetQuerySchema from '@shared/api/getQuerySchema';
import {
  provideApolloClient,
  useMutation,
  useQuery,
} from '@vue/apollo-composable';

import type { MaybeRef } from 'vue';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@vue/apollo-composable';
import type { ReactiveFunction } from '@vue/apollo-composable/dist/util/ReactiveFunction';
import type { VariablesParameter } from '@vue/apollo-composable/dist/useQuery';

import type {
  QueryActions,
  GetQuerySchemaParams,
} from '@shared/api/getQuerySchema';
import { ApolloError } from '@apollo/client';
import { OnErrorContext as OnMutationErrorContext } from '@vue/apollo-composable/dist/useMutation';
import { OnErrorContext as OnQueryErrorContext } from '@vue/apollo-composable/dist/useQuery';
import apolloClient from '../apollo/apollo-client';

provideApolloClient(apolloClient);

interface SendQueryParams {
  action: QueryActions;
  entity: string;
  body: MaybeRef<string>;
}

type QueryErrorCallback = (
  param: ApolloError,
  context: OnMutationErrorContext | OnQueryErrorContext
) => void;

export function sendMutation<TResult>(
  params: SendQueryParams,
  options?: MaybeRef<UseMutationOptions> | ReactiveFunction<UseMutationOptions>
) {
  const { action, entity, body } = params;

  const schema = GetQuerySchema({
    actionName: action,
    entityName: entity,
    queryBody: body,
  } as GetQuerySchemaParams);

  const mutationResult = useMutation<TResult>(schema, options);

  let errorCallback: QueryErrorCallback | null = null;

  function onErrorHandler(fn: QueryErrorCallback) {
    errorCallback = fn;
  }

  mutationResult.onError((param, context) => {
    console.log('-------MUTATION FAILED-------');
    console.log(`ERROR MESSAGE: ${param.message}`);
    console.log('-----------------------------');

    errorCallback?.(param, context);
  });

  return {
    query: mutationResult,
    onError: onErrorHandler,
  };
}

export function sendQuery<TResult>(
  params: SendQueryParams,
  variables?: VariablesParameter<any>,
  options?: MaybeRef<UseQueryOptions> | ReactiveFunction<UseQueryOptions>
) {
  const { action, entity, body } = params;

  const schema = GetQuerySchema({
    actionName: action,
    entityName: entity,
    queryBody: body,
  } as GetQuerySchemaParams);

  let queryResult = null;

  if (options) queryResult = useQuery<TResult>(schema, variables, options);
  else queryResult = useQuery<TResult>(schema, variables);

  let errorCallback: QueryErrorCallback | null = null;

  function onErrorHandler(fn: QueryErrorCallback) {
    errorCallback = fn;
  }

  queryResult.onError((param, context) => {
    console.log('-------QUERY FAILED-------');
    console.log(`ERROR MESSAGE: ${param.message}`);
    console.log('-----------------------------');

    errorCallback?.(param, context);
  });

  return {
    query: queryResult,
    onError: onErrorHandler,
  };
}
