import { EntityActionType, EntityHelperActionType } from '@constants';
import { EntityAction, NormalizedEntitiesState } from '@interfaces';
import {
  list,
  goToPage,
  create,
  update,
  remove,
  invalidateQuery,
  read,
  initializeQuery,
} from './handlers';

const initialState: NormalizedEntitiesState = {};

export const normalizedEntitiesState = (
  state = initialState,
  action: EntityAction
) => {
  switch (action.type) {
    case EntityActionType.LIST:
      return list(
        action.entityName,
        action.entities,
        action.schema,
        action.currentPage,
        action.queryKey,
        action.pagination,
        action.sizeMultiplier,
        action.params,
        state
      );
    case EntityActionType.CREATE:
      return create(action.entityName, action.entity, action.schema, state);
    case EntityActionType.UPDATE:
      return update(
        action.entityName,
        action.entity,
        action.prevEntity,
        action.schema,
        state
      );
    case EntityActionType.READ:
      return read(action.entityName, action.entity, action.schema, state);
    case EntityActionType.REMOVE:
      return remove(action.entityName, action.entityId, action.schema, state);
    case EntityHelperActionType.GO_TO_PAGE:
      return goToPage(
        action.entityName,
        action.queryKey,
        action.page,
        action.size,
        action.sizeMultiplier,
        state
      );
    case EntityHelperActionType.INVALIDATE_QUERY:
      return invalidateQuery(action.entityName, action.queryKey, state);
    case EntityHelperActionType.INITIALIZE_QUERY:
      return initializeQuery(
        action.entityName,
        action.queryKey,
        action.initialLoadingSize,
        state
      );
    default:
      return state;
  }
};
