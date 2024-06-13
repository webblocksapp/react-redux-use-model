import { Entity, Pagination } from '@interfaces';

export type QueryState<TEntity extends Entity = Entity, TParams = any> = {
  ids: Array<Exclude<TEntity['id'], undefined>>;
  queryKey: string;
  loading: boolean;
  listing: boolean;
  creating: boolean;
  updating: boolean;
  reading: boolean;
  removing: boolean;
  timestamp?: number;
  params?: TParams;
  pagination?: Pagination;
  calculatedPagination?: Pagination;
  currentPage?: number;
  calculatedCurrentPage?: number;
};
