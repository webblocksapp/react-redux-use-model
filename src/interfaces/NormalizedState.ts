import { Entity, QueryState } from '@interfaces';

export type NormalizedState<TEntity extends Entity = Entity> = {
  byId?: {
    [id: string]: TEntity;
  };
  allIds?: Array<string>;
  queries?: Array<QueryState>;
  timestamps?: {
    optimisticUpdate?: number;
    optimisticRemove?: number;
  };
};
