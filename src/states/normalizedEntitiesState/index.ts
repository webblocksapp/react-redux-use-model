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
        action.currentPage,
        action.queryKey,
        action.pagination,
        action.sizeMultiplier,
        action.params,
        state
      );
    case EntityActionType.CREATE:
      return create(action.entityName, action.entity, action.queryKey, state);
    case EntityActionType.UPDATE:
      return update(action.entityName, action.entity, state);
    case EntityActionType.READ:
      return read(action.entityName, action.entity, state);
    case EntityActionType.REMOVE:
      return remove(
        action.entityName,
        action.entityId,
        action.foreignKeys,
        state
      );
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
    default:
      return state;
  }
};
