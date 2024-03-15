import { QueryState } from '@interfaces';

export type NormalizedState<TEntity> = {
  byId: {
    [id: string]: TEntity;
  };
  allIds: Array<string>;
  queries: Array<QueryState>;
};
