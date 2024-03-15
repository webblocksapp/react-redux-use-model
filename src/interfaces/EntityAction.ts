import { EntityActionType as ActionType } from '@constants';
import { QueryState } from './QueryState';

export type EntityAction<TEntity extends { id: string } = any> =
  | {
      type: ActionType.LIST;
      entityName: string;
      entities: TEntity[];
      queryKey: string | undefined;
      pagination?: QueryState['pagination'];
      currentPage?: number;
      params?: any;
    }
  | {
      type: ActionType.CREATE;
      entityName: string;
      entity: TEntity;
    }
  | {
      type: ActionType.UPDATE;
      entityName: string;
      entity: TEntity;
    }
  | {
      type: ActionType.REMOVE;
      entityName: string;
      entityId: string;
    }
  | {
      type: ActionType.GO_TO_PAGE;
      entityName: string;
      queryKey: string;
      page: number;
    };
