import GetQuerySchema from '@shared/api/getQuerySchema';
import { useMutation, useQuery } from '@vue/apollo-composable';

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

interface SendQueryParams {
  action: QueryActions;
  entity: string;
  body: MaybeRef<string>;
}

export function sendMutation(
  params: SendQueryParams,
  options?: MaybeRef<UseMutationOptions> | ReactiveFunction<UseMutationOptions>
) {
  const { action, entity, body } = params;

  const getSchemaParams: GetQuerySchemaParams = {
    actionName: action,
    entityName: entity,
    queryBody: body,
  };

  const schema = GetQuerySchema(getSchemaParams);

  return useMutation(schema, options);
}

export function sendQuery(
  params: SendQueryParams,
  variables?: VariablesParameter<any>,
  options?: MaybeRef<UseQueryOptions> | ReactiveFunction<UseQueryOptions>
) {
  const { action, entity, body } = params;

  const getSchemaParams: GetQuerySchemaParams = {
    actionName: action,
    entityName: entity,
    queryBody: body,
  };

  const schema = GetQuerySchema(getSchemaParams);

  if (options) return useQuery(schema, variables, options);
  return useQuery(schema, variables);
}
