import { EntityActionType, EntityHelperActionType } from '@constants';
import { QueryState, ForeignKey } from '@interfaces';

export type EntityAction<TEntity extends { id: string } = any> =
  | {
      type: EntityActionType.LIST;
      entityName: string;
      entities: TEntity[];
      queryKey: string | undefined;
      pagination?: QueryState['pagination'];
      currentPage?: number;
      params?: any;
    }
  | {
      type: EntityActionType.CREATE;
      entityName: string;
      entity: TEntity;
    }
  | {
      type: EntityActionType.UPDATE;
      entityName: string;
      entity: TEntity;
      optimisticUpdateTimestamp?: number;
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
    }
  | {
      type: EntityHelperActionType.UPDATE_TIMESTAMPS;
      entityName: string;
      timestamps: {
        optimisticUpdate?: number;
        optimisticRemove?: number;
      };
    };
