import { NormalizedEntitiesState, StateQuery } from '@interfaces';
import {
  buildEmptyIds,
  getArrayIds,
  mergeIds,
  mergeQueries,
  mergeUniqueIds,
  normalizeArray,
} from '@utils';

export const list = (
  entityName: string,
  entities: any[],
  currentPage: number | undefined,
  queryKey: string | undefined,
  queryData: StateQuery['queryData'],
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
        queryData,
        currentPage
      ),
    },
  };
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

            console.log({ queryData });

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
