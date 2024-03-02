import { StateQuery, StateQueryParams } from '@interfaces';
import { mergeUniqueIds } from '@utils';

const queryExists = (item: StateQuery, queryParams: StateQueryParams) => {
  if (queryParams.componentId) {
    return (
      item.componentId == queryParams.componentId &&
      item.componentName == queryParams.componentName
    );
  } else {
    return item.componentName == queryParams.componentName;
  }
};

export const mergeQueries = (
  queries: StateQuery[],
  queryParams: StateQueryParams | undefined,
  ids: string[]
): StateQuery[] => {
  if (queryParams === undefined) return queries;
  if (queries.some((item) => queryExists(item, queryParams))) {
    return queries.map((item) => {
      if (queryExists(item, queryParams)) {
        return { ...queryParams, ids: mergeUniqueIds(item.ids, ids) };
      }
      return item;
    });
  } else {
    return [...queries, { ...queryParams, ids }];
  }
};
