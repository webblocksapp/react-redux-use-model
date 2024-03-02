import { Pagination, StateQuery } from '@interfaces';
import {
  calcPaginationIndexes,
  mergeUniqueIds,
  replaceArrayPortion,
} from '@utils';

const queryExists = (item: StateQuery, componentId: string) =>
  item.componentId == componentId;

const mergeIds = (
  originalIds: string[],
  newIds: string[],
  pagination?: Pagination
) => {
  if (pagination) {
    const { startIndex, endIndex } = calcPaginationIndexes({
      page: pagination.page,
      size: pagination.size,
    });

    return replaceArrayPortion({
      originalArray: originalIds,
      replacementArray: newIds,
      startIndex,
      endIndex,
      keepEmptyPositions: true,
      removeDuplicates: true,
    });
  } else {
    return mergeUniqueIds(originalIds, newIds);
  }
};

export const mergeQueries = <TQueryData extends { pagination?: Pagination }>(
  queries: StateQuery<TQueryData>[],
  componentId: string | undefined,
  ids: string[],
  queryData?: TQueryData
): StateQuery<TQueryData>[] => {
  if (componentId === undefined) return queries;

  if (queries.some((item) => queryExists(item, componentId))) {
    return queries.map((item) => {
      if (queryExists(item, componentId)) {
        return {
          ...item,
          ids: mergeIds(item.ids, ids, queryData?.pagination),
          queryData,
        };
      }
      return item;
    });
  } else {
    return [...queries, { componentId, ids, queryData }];
  }
};
