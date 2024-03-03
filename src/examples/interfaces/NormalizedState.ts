import { StateQuery } from '@interfaces';

export type NormalizedState<TEntity, TQueryData> = {
  byId: {
    [id: string]: TEntity;
  };
  allIds: Array<string>;
  queries: Array<StateQuery<TQueryData>>;
};
