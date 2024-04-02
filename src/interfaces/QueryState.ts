import { Entity, Pagination } from '@interfaces';

export type QueryState<TEntity extends Entity = Entity, TParams = any> = {
  ids: Array<Exclude<TEntity['id'], undefined>>;
  queryKey: string;
  params?: TParams;
  pagination?: Pagination;
  calculatedPagination?: Pagination;
  currentPage?: number;
  calculatedCurrentPage?: number;
};
