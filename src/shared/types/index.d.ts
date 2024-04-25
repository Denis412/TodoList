/* eslint-disable no-unused-vars */

/* PAGINATION TYPES */

export enum PaginatorWhereOperator {
  EQ,
  FTS,
  NEQ,
}

export enum PaginatorOrderByOrder {
  ASC,
  DESC,
}

interface PaginatorWhere {
  column: string;
  operator: PaginatorWhereOperator;
  value?: string | number | boolean | undefined;
  or?: PaginatorWhere[] | undefined;
  and?: PaginatorWhere[] | undefined;
}

interface PaginatorOrderBy {
  column: string;
  order: PaginatorOrderByOrder;
}

interface PaginatorInfo {
  total: number;
  count: number;
  currentPage: number;
  perPage: number;
}

interface PaginatorPayload {
  page: number;
  perPage: number;
  where?: PaginatorWhere | undefined;
  orderBy?: PaginatorOrderBy | undefined;
}

interface PaginatorResult<T> {
  data: T[];
  paginatorInfo: PaginatorInfo;
}

/* PAGINATION TYPES */

/* MUTATION TYPES */

interface CreatePayload<I> {
  input: I;
}

interface UpdatePayload<I> {
  id: string;
  input: I;
}

interface CreateOrUpdateResult<T> {
  record: T;
  recordId: string;
}

interface DeleteResult {
  recordId: string;
}

/* MUTATION TYPES */

/* SHARED TYPES */

interface Relation {
  objectId: string;
}

/* SHARED TYPES */
