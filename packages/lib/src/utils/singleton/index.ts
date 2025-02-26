import { Id } from '@interfaces';

type QueryItem = {
  entityName: string;
  queryKey: string | undefined;
  ids: Array<Id>;
};

let SINGLETON: Array<QueryItem> = [];

const queryExists = (item: QueryItem, args: QueryItem) =>
  item.entityName == args.entityName && item.queryKey == args.queryKey;

export const produceIds = (args: QueryItem & { eventName?: string }) => {
  const { eventName: _, ...restArgs } = args;

  if (SINGLETON.some((item) => queryExists(item, restArgs))) {
    SINGLETON = SINGLETON.map((item) => {
      if (queryExists(item, restArgs)) {
        return { ...item, ...restArgs };
      }
      return item;
    });
  } else {
    SINGLETON = [...SINGLETON, { ...restArgs }];
  }

  return SINGLETON.find((item) => queryExists(item, restArgs))?.ids || [];
};
