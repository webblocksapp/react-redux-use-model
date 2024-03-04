import { Pagination, StateQuery } from '@interfaces';
import { mergeIds } from '@utils';

const queryExists = (item: StateQuery, queryKey: string) =>
  item.queryKey == queryKey;

export const mergeQueries = <TQueryData extends { pagination?: Pagination }>(
  queries: StateQuery<TQueryData>[],
  queryKey: string | undefined,
  ids: string[],
  queryData?: TQueryData,
  currentPage?: number
): StateQuery<TQueryData>[] => {
  if (queryKey === undefined) return queries;

  if (queries.some((item) => queryExists(item, queryKey))) {
    return queries.map((item) => {
      if (queryExists(item, queryKey)) {
        return {
          ...item,
          ids: mergeIds(item.ids, ids, queryData?.pagination),
          queryData: {
            ...queryData,
            pagination: {
              ...queryData?.pagination,
              page: currentPage ?? queryData?.pagination?.page,
            },
          } as TQueryData,
        };
      }
      return item;
    });
  } else {
    return [...queries, { queryKey, ids, queryData }];
  }
};
