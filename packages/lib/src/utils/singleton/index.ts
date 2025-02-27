import { Id } from '@interfaces';

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
};

let SINGLETON: Array<Singleton> = [];

const queryExists = (item: QueryId, args: QueryId) =>
  item.entityName == args.entityName && item.queryKey == args.queryKey;

export const produceIds = (
  args: QueryItem & {
    eventName?: string;
  }
) => {
  const { eventName: _, method, ...restArgs } = args;

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

  return SINGLETON.find((item) => queryExists(item, restArgs))?.ids || [];
};
