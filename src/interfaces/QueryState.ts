import { Pagination } from '@interfaces';

export type QueryState<TParams = any> = {
  ids: Array<string>;
  queryKey: string;
  params?: TParams;
  pagination?: Pagination;
  calculatedPagination?: Pagination;
  currentPage?: number;
  calculatedCurrentPage?: number;
};
