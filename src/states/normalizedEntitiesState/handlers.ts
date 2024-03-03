import { NormalizedEntitiesState } from '@interfaces';
import {
  getArrayIds,
  mergeQueries,
  mergeUniqueIds,
  normalizeArray,
} from '@utils';

export const list = (
  entityName: string,
  entities: any[],
  queryKey: string | undefined,
  queryData: any,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  const entityState = state[entityName];

  return {
    ...state,
    [entityName]: {
      ...entityState,
      byId: { ...entityState?.byId, ...normalizeArray(entities) },
      allIds: mergeUniqueIds(entityState?.allIds || [], getArrayIds(entities)),
      queries: mergeQueries(
        entityState?.queries || [],
        queryKey,
        getArrayIds(entities),
        queryData
      ),
    },
  };
};
