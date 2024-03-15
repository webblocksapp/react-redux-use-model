import { NormalizedEntitiesState, StateQuery } from '@interfaces';
import {
  buildEmptyIds,
  mergeIds,
  mergeQueries,
  mergeUniqueIds,
  normalizer,
} from '@utils';

export const list = (
  entityName: string,
  entities: any[],
  currentPage: number | undefined,
  queryKey: string | undefined,
  queryData: StateQuery['queryData'],
  params: any,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let normalizedState: NormalizedEntitiesState = {};

  for (let [key, value] of Object.entries(normalizer(entities, entityName))) {
    const entityState = state[key];
    const newIds = Object.keys(value);

    normalizedState[key] = {
      ...entityState,
      byId: { ...entityState?.byId, ...value },
      allIds: mergeUniqueIds(entityState?.allIds || [], newIds),
      queries: mergeQueries({
        queries: entityState?.queries || [],
        queryKey,
        ids: newIds,
        queryData,
        currentPage,
        params,
      }),
    };
  }

  return {
    ...state,
    ...normalizedState,
  };
};

export const save = (
  entityName: string,
  entity: any,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let normalizedState: NormalizedEntitiesState = {};

  for (let [key, value] of Object.entries(normalizer(entity, entityName))) {
    const entityState = state[key];
    const newIds = Object.keys(value);

    normalizedState[key] = {
      ...entityState,
      byId: { ...entityState?.byId, ...value },
      allIds: mergeUniqueIds(entityState?.allIds || [], newIds),
    };
  }

  return {
    ...state,
    ...normalizedState,
  };
};

export const remove = (
  entityName: string,
  entityId: string,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let normalizedState: NormalizedEntitiesState = {};
  const entityState = state[entityName];

  if (entityState?.byId) {
    const byId = entityState?.byId;
    const { [entityId]: removedEntity, ...restById } = byId;

    normalizedState[entityName] = {
      ...entityState,
      byId: restById,
      allIds: (entityState?.allIds || []).filter((id) => id !== entityId),
    };

    return {
      ...state,
      ...normalizedState,
    };
  }

  return state;
};

export const goToPage = (
  entityName: string,
  queryKey: string | undefined,
  page: number,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  const entityState = state[entityName];

  return {
    ...state,
    [entityName]: {
      ...entityState,
      queries: entityState?.queries?.map((item) => {
        if (item.queryKey === queryKey) {
          if (item.queryData?.pagination === undefined) {
            console.warn('queryData lacks of pagination object.');
          } else {
            const queryData = {
              ...item.queryData,
              pagination: {
                ...item.queryData.pagination,
                page,
              },
            };

            return {
              ...item,
              ids: mergeIds(
                item.ids,
                buildEmptyIds({ size: queryData.pagination.size }),
                queryData.pagination,
                { replaceWhenEmpty: true }
              ),
              queryData,
            };
          }
        }
        return item;
      }),
    },
  };
};
