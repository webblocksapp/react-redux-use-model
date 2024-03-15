import { QueryState } from '@interfaces';
import { mergeIds } from '@utils';

const queryExists = (item: QueryState, queryKey: string) =>
  item.queryKey == queryKey;

export const mergeQueries = (args: {
  queries: QueryState[];
  queryKey: string | undefined;
  ids: string[];
  pagination?: QueryState['pagination'];
  currentPage?: number;
  params?: any;
}): QueryState[] => {
  const { queries, queryKey, ids, pagination, currentPage, params } = args;

  if (queryKey === undefined) return queries;

  if (queries.some((item) => queryExists(item, queryKey))) {
    return queries.map((item) => {
      if (queryExists(item, queryKey)) {
        return {
          ...item,
          ids: mergeIds(item.ids, ids, pagination),
          params,
          ...(pagination
            ? {
                pagination: {
                  ...pagination,
                  page: currentPage ?? pagination?.page,
                },
              }
            : undefined),
        };
      }
      return item;
    });
  } else {
    return [...queries, { queryKey, ids, pagination, params }];
  }
};
