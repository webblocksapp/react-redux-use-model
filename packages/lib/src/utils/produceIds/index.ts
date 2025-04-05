import { ListMode } from '@constants';
import { Id, Pagination, QueryId, QueryItem, Singleton } from '@interfaces';
import { paginateData } from '@utils/paginateData';

let SINGLETON: Array<Singleton> = [];

const queryExists = (item: QueryId, args: QueryId) =>
  item.entityName == args.entityName && item.queryKey == args.queryKey;

export const updateQueryPagination = (
  args: QueryId,
  pagination: Pagination | undefined
) => {
  const query = SINGLETON.find((item) => queryExists(item, args));
  if (query) {
    query.lastPagination = pagination;
  }
};

export const updateQueryListMode = (
  args: QueryId,
  mode: ListMode | undefined
) => {
  const query = SINGLETON.find((item) => queryExists(item, args));
  if (query) {
    query.listMode = mode;
  } else {
    SINGLETON = [
      ...SINGLETON,
      {
        entityName: args.entityName,
        queryKey: args.queryKey,
        ids: [],
        listMode: mode,
      },
    ];
  }
};

export const produceIds = (
  args: QueryItem & {
    eventName?: string;
  }
) => {
  const {
    eventName: _,
    pagination = { size: 10, page: 0, totalElements: 10, totalPages: 1 },
    method,
    ...restArgs
  } = args;

  if (SINGLETON.some((item) => queryExists(item, restArgs))) {
    SINGLETON = SINGLETON.map((item) => {
      if (queryExists(item, restArgs)) {
        return { ...item, ...restArgs, ids: method({ currentIds: item.ids }) };
      }
      return item;
    });
  } else {
    SINGLETON = [
      ...SINGLETON,
      { ...restArgs, ids: method({ currentIds: [] }) },
    ];
  }

  const query = SINGLETON.find((item) => queryExists(item, restArgs));
  const ids = query?.ids || [];
  const lastPagination = query?.lastPagination || pagination;
  let result: Id[];

  if (query?.listMode === ListMode.LoadMore) {
    result = ids;
  } else {
    const { content } = paginateData(ids, {
      ...lastPagination,
      limit: pagination.size,
    });
    result = content;
  }

  return result;
};
