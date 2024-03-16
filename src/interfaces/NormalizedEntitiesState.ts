import { Entity, QueryState } from '@interfaces';

export type NormalizedEntitiesState = {
  [entityName: string]:
    | {
        byId?: {
          [id: string]: Entity;
        };
        allIds?: Array<string>;
        queries?: Array<QueryState>;
        timestamps?: {
          optimisticUpdate?: number;
          optimisticRemove?: number;
        };
      }
    | undefined;
};
