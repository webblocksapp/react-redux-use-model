import { Id, Pagination } from '@interfaces';

export type QueryItem = {
  entityName: string;
  queryKey: string | undefined;
  method: (args: { currentIds: Array<Id> }) => Array<Id>;
  pagination: Pagination | undefined;
};
