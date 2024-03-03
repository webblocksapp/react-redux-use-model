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
    }
  | {
      type: ActionType.NEXT_PAGE;
      entityName: string;
      queryKey: string;
    }
  | {
      type: ActionType.PREV_PAGE;
      entityName: string;
      queryKey: string;
    };
