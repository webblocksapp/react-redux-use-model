import { EntityActionType, EntityHelperActionType } from '@constants';
import { QueryState, ForeignKey } from '@interfaces';

export type EntityAction<TEntity extends { id: string } = any> =
  | {
      type: EntityActionType.LIST;
      entityName: string;
      entities: TEntity[];
      queryKey: string | undefined;
      pagination?: QueryState['pagination'];
      sizeMultiplier?: number;
      currentPage?: number;
      params?: any;
    }
  | {
      type: EntityActionType.CREATE;
      entityName: string;
      entity: TEntity;
      queryKey: string | undefined;
    }
  | {
      type: EntityActionType.UPDATE;
      entityName: string;
      entity: TEntity;
    }
  | {
      type: EntityActionType.REMOVE;
      entityName: string;
      entityId: string;
      foreignKeys: Array<ForeignKey>;
    }
  | {
      type: EntityHelperActionType.GO_TO_PAGE;
      entityName: string;
      queryKey: string;
      page: number;
      size: number;
      sizeMultiplier: number;
    };
