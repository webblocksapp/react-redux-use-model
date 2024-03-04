import { EntityActionType as ActionType } from '@constants';

export type EntityAction<
  TNormalizedEntity extends { id: string } = any,
  TQueryData = any
> =
  | {
      type: ActionType.LIST;
      entityName: string;
      entities: TNormalizedEntity[];
      queryKey: string | undefined;
      queryData?: TQueryData;
      currentPage?: number;
    }
  | {
      type: ActionType.GO_TO_PAGE;
      entityName: string;
      queryKey: string;
      page: number;
    };
