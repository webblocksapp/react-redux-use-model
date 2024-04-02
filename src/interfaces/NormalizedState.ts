import { Entity, QueryState } from '@interfaces';

export type NormalizedState<TEntity extends Entity = Entity> = {
  byId?: {
    [id: string | number]: TEntity;
  };
  allIds?: Array<string | number>;
  queries?: Array<QueryState>;
};
