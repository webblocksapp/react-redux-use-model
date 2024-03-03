import { Pagination, StateQuery } from '@interfaces';

export type NormalizedState<
  TEntity,
  TQueryData extends { pagination?: Pagination }
> = {
  byId: {
    [id: string]: TEntity;
  };
  allIds: Array<string>;
  queries: Array<StateQuery<TQueryData>>;
};
