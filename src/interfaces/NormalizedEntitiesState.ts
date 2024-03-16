import { NormalizedState } from '@interfaces';

export type NormalizedEntitiesState = {
  [entityName: string]: NormalizedState | undefined;
};
