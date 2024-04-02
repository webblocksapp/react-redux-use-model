import { EntityActionType, EntityHelperActionType } from '@constants';
import { QueryState, ModelSchema } from '@interfaces';

export type EntityAction<TEntity extends { id: string } = any> =
  | {
      type: EntityActionType.LIST;
      entityName: string;
      entities: TEntity[];
      schema: ModelSchema | undefined;
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
      schema: ModelSchema | undefined;
    }
  | {
      type: EntityActionType.UPDATE;
      entityName: string;
      entity: TEntity;
      prevEntity?: TEntity;
      schema: ModelSchema | undefined;
    }
  | {
      type: EntityActionType.READ;
      entityName: string;
      entity: TEntity;
      schema: ModelSchema | undefined;
    }
  | {
      type: EntityActionType.REMOVE;
      entityName: string;
      entityId: string;
      schema: ModelSchema | undefined;
    }
  | {
      type: EntityHelperActionType.GO_TO_PAGE;
      entityName: string;
      queryKey: string;
      page: number;
      size: number;
      sizeMultiplier: number;
    }
  | {
      type: EntityHelperActionType.INVALIDATE_QUERY;
      entityName: string;
      queryKey: string;
    }
  | {
      type: EntityHelperActionType.INITIALIZE_QUERY;
      entityName: string;
      queryKey: string;
    };
