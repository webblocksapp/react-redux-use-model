import { ListMode } from '@constants';
import { Id, Pagination } from '@interfaces';

export type Singleton = {
  entityName: string;
  queryKey: string | undefined;
  listMode?: ListMode;
  ids: Array<Id>;
  timestamp?: number;
  lastPagination?: Pagination;
};
