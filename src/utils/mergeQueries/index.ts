import { StateQuery } from '@interfaces';
import { mergeUniqueIds } from '@utils';

const queryExists = (item: StateQuery, componentId: string) =>
  item.componentId == componentId;

export const mergeQueries = (
  queries: StateQuery[],
  componentId: string | undefined,
  ids: string[]
): StateQuery[] => {
  if (componentId === undefined) return queries;
  if (queries.some((item) => queryExists(item, componentId))) {
    return queries.map((item) => {
      if (queryExists(item, componentId)) {
        return { ...item, ids: mergeUniqueIds(item.ids, ids) };
      }
      return item;
    });
  } else {
    return [...queries, { componentId, ids }];
  }
};
