import { Id, Pagination } from '@interfaces';
import { paginateData } from '@utils/paginateData';

type QueryId = {
  entityName: string;
  queryKey: string | undefined;
};

type Singleton = {
  entityName: string;
  queryKey: string | undefined;
  ids: Array<Id>;
};

type QueryItem = {
  entityName: string;
  queryKey: string | undefined;
  method: (args: { currentIds: Array<Id> }) => Array<Id>;
  pagination: Pagination | undefined;
};

let SINGLETON: Array<Singleton> = [];

const queryExists = (item: QueryId, args: QueryId) =>
  item.entityName == args.entityName && item.queryKey == args.queryKey;

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

  const ids = SINGLETON.find((item) => queryExists(item, restArgs))?.ids || [];
  const { content } = paginateData(ids, {
    ...pagination,
    limit: pagination.size,
  });

  return content;
};
