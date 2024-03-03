import { Pagination } from '@interfaces';

export type StateQuery<
  TQueryData extends { pagination?: Pagination } = { pagination?: Pagination }
> = {
  ids: Array<string>;
  queryKey: string;
  queryData?: TQueryData;
};
