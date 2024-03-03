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

export const nextPage = (
  entityName: string,
  queryKey: string | undefined,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  const entityState = state[entityName];

  return {
    ...state,
    [entityName]: {
      ...entityState,
      queries: entityState?.queries?.map((item) => {
        if (item.queryKey === queryKey) {
        }
        return item;
      }),
    },
  };
};
