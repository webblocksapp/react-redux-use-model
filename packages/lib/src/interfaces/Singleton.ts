import { Id } from '@interfaces';

export type Singleton = {
  entityName: string;
  queryKey: string | undefined;
  ids: Array<Id>;
};
