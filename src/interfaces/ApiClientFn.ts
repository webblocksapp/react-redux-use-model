import { Pagination } from '@interfaces';

export type ApiClientFn<TData = any, TParams = any> = (
  params: TParams
) => Promise<{ data: TData; pagination?: Pagination }>;
