import { StateQuery } from '@interfaces';

export type NormalizedEntitiesState = {
  [entityName: string]:
    | {
        byId?: {
          [id: string]: any | undefined;
        };
        allIds?: Array<string>;
        queries?: Array<StateQuery>;
      }
    | undefined;
};
