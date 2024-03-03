import { Pagination, StateQuery } from '@interfaces';
import {
  calcPaginationIndexes,
  mergeUniqueIds,
  replaceArrayPortion,
} from '@utils';

const queryExists = (item: StateQuery, queryKey: string) =>
  item.queryKey == queryKey;

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
  queryKey: string | undefined,
  ids: string[],
  queryData?: TQueryData
): StateQuery<TQueryData>[] => {
  if (queryKey === undefined) return queries;

  if (queries.some((item) => queryExists(item, queryKey))) {
    return queries.map((item) => {
      if (queryExists(item, queryKey)) {
        return {
          ...item,
          ids: mergeIds(item.ids, ids, queryData?.pagination),
          queryData,
        };
      }
      return item;
    });
  } else {
    return [...queries, { queryKey, ids, queryData }];
  }
};
