import { Pagination } from '@interfaces';

export type StateQuery<TQueryData extends { pagination?: Pagination } = any> = {
  ids: Array<string>;
  queryKey: string;
  queryData?: TQueryData;
};
