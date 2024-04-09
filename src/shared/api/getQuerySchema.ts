import gql from 'graphql-tag';
import { capitalize } from '@shared/index';
import { computed, isRef, MaybeRef, watch } from 'vue';

export enum QueryActions {
  CREATE,
  UPDATE,
  DELETE,
  PAGINATE,
  GET,
}

export interface GetQuerySchemaParams {
  entityName: string;
  actionName: QueryActions;
  queryBody: MaybeRef<string>;
}

type GetCreateSchemaParams = Omit<GetQuerySchemaParams, 'actionName'>;

function GetCreateSchema(params: GetCreateSchemaParams) {
  const { entityName, queryBody } = params;

  const capitalizeEntityName = capitalize(entityName);

  const queryString = `mutation create${capitalizeEntityName}($input: Create${capitalizeEntityName}Input!) {
    Create${capitalizeEntityName}(input: $input) {
      record ${queryBody}
      recordId
    }
  }`;

  return gql`
    ${queryString}
  `;
}

function GetUpdateSchema(params: GetCreateSchemaParams) {
  const { entityName, queryBody } = params;

  const capitalizeEntityName = capitalize(entityName);

  const queryString = `mutation update${capitalizeEntityName}($input: Update${capitalizeEntityName}Input!) {
    Update${capitalizeEntityName}(id: $id, input: $input) {
      record ${queryBody}
      recordId
    }
  }`;

  return gql`
    ${queryString}
  `;
}

function GetDeleteSchema(params: GetCreateSchemaParams) {
  const { entityName } = params;

  const capitalizeEntityName = capitalize(entityName);

  const queryString = `mutation delete${capitalizeEntityName}($id: String!) {
    Delete${capitalizeEntityName}(id: $id) {
      recordId
    }
  }`;

  return gql`
    ${queryString}
  `;
}

function GetPaginationSchema(params: GetCreateSchemaParams) {
  const { entityName, queryBody } = params;

  const capitalizeEntityName = capitalize(entityName);

  const queryString = `query paginate${capitalizeEntityName}($page: Int!, $perPage: Int!, $where: PaginatorWhere, $orderBy: PaginatorOrderBy) {
    Paginate${capitalizeEntityName}(page: $page, perPage: $perPage, where: $where, orderBy: $orderBy) {
      data ${queryBody}
      paginatorInfo {
        total
        count
        currentPage
        perPage
      }
    }
  }`;

  return gql`
    ${queryString}
  `;
}

function GetOneObjectSchema(params: GetCreateSchemaParams) {
  const { entityName, queryBody } = params;

  const capitalizeEntityName = capitalize(entityName);

  const queryString = `query get${capitalizeEntityName}($id: String!) {
    Get${capitalizeEntityName}(id: $id) ${queryBody}
  }`;

  return gql`
    ${queryString}
  `;
}

export default function getQuerySchema(params: GetQuerySchemaParams) {
  const { actionName, entityName, queryBody } = params;

  function getSchema(body: string) {
    switch (actionName) {
      case QueryActions.CREATE:
        return GetCreateSchema({ entityName, queryBody: body });
      case QueryActions.UPDATE:
        return GetUpdateSchema({ entityName, queryBody: body });
      case QueryActions.DELETE:
        return GetDeleteSchema({ entityName, queryBody: body });
      case QueryActions.PAGINATE:
        return GetPaginationSchema({ entityName, queryBody: body });
      case QueryActions.GET:
        return GetOneObjectSchema({ entityName, queryBody: body });
    }
  }

  return computed(() => {
    const schemaResult = getSchema(
      isRef(queryBody) ? queryBody.value : queryBody
    );

    return schemaResult;
  });
}
