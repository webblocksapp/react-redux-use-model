import { EntityActionType, EntityHelperActionType } from '@constants';
import { QueryState, ModelSchema, Entity } from '@interfaces';

export type EntityAction<TEntity extends Entity = Entity> =
  | {
      type: EntityActionType.LIST;
      entityName: string;
      entities: TEntity[];
      schema: ModelSchema<TEntity> | undefined;
      queryKey: string | undefined;
      pagination?: QueryState['pagination'];
      sizeMultiplier?: number;
      currentPage?: number;
      invalidatedQuery?: boolean;
      params?: any;
    }
  | {
      type: EntityActionType.CREATE;
      entityName: string;
      entity: TEntity;
      schema: ModelSchema<TEntity> | undefined;
    }
  | {
      type: EntityActionType.UPDATE;
      entityName: string;
      entity: TEntity;
      prevEntity?: TEntity;
      schema: ModelSchema<TEntity> | undefined;
    }
  | {
      type: EntityActionType.READ;
      entityName: string;
      entity: TEntity;
      schema: ModelSchema<TEntity> | undefined;
    }
  | {
      type: EntityActionType.REMOVE;
      entityName: string;
      entityId: string | number;
      schema: ModelSchema<TEntity> | undefined;
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
      ids: Array<string | number>;
      initialLoadingSize: number;
    }
  | {
      type: EntityHelperActionType.INITIALIZE_QUERY;
      entityName: string;
      queryKey: string;
      initialLoadingSize: number;
      timestamp: number;
    }
  | {
      type: EntityHelperActionType.UPDATE_QUERY_LOADERS;
      entityName: string;
      queryKey: string;
      loading?: boolean;
      listing?: boolean;
      creating?: boolean;
      updating?: boolean;
      removing?: boolean;
      reading?: boolean;
    };
