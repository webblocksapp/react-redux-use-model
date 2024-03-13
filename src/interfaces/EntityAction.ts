import { EntityActionType as ActionType } from '@constants';
import { Pagination } from '@interfaces';

export type EntityAction<
  TNormalizedEntity extends { id: string } = any,
  TQueryData extends { pagination?: Pagination } = { pagination?: Pagination }
> =
  | {
      type: ActionType.LIST;
      entityName: string;
      entities: TNormalizedEntity[];
      queryKey: string | undefined;
      queryData?: TQueryData;
      currentPage?: number;
      params?: any;
    }
  | {
      type: ActionType.GO_TO_PAGE;
      entityName: string;
      queryKey: string;
      page: number;
    };
