import { Entity, QueryState } from '@interfaces';

export type NormalizedEntitiesState = {
  [entityName: string]:
    | {
        byId?: {
          [id: string]: Entity;
        };
        allIds?: Array<string>;
        queries?: Array<QueryState>;
      }
    | undefined;
};
