import { StateQuery } from '@interfaces';
import { mergeUniqueIds } from '@utils';

const queryExists = (item: StateQuery, componentId: string) =>
  item.componentId == componentId;

export const mergeQueries = <TQueryData>(
  queries: StateQuery<TQueryData>[],
  componentId: string | undefined,
  ids: string[],
  queryData?: TQueryData
): StateQuery<TQueryData>[] => {
  if (componentId === undefined) return queries;
  if (queries.some((item) => queryExists(item, componentId))) {
    return queries.map((item) => {
      if (queryExists(item, componentId)) {
        return { ...item, ids: mergeUniqueIds(item.ids, ids), queryData };
      }
      return item;
    });
  } else {
    return [...queries, { componentId, ids, queryData }];
  }
};
