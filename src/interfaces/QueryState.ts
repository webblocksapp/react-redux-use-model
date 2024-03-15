import { Pagination } from '@interfaces';

export type QueryState = {
  ids: Array<string>;
  queryKey: string;
  params?: any;
  pagination?: Pagination;
};
