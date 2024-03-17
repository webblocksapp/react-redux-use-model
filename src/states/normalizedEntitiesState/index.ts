import { EntityActionType, EntityHelperActionType } from '@constants';
import { EntityAction, NormalizedEntitiesState } from '@interfaces';
import {
  list,
  goToPage,
  create,
  update,
  remove,
  updateTimestamps,
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
        action.params,
        state
      );
    case EntityActionType.CREATE:
      return create(action.entityName, action.entity, state);
    case EntityActionType.UPDATE:
      return update(action.entityName, action.entity, state);
    case EntityActionType.REMOVE:
      return remove(
        action.entityName,
        action.entityId,
        action.foreignKeys,
        state
      );
    case EntityHelperActionType.GO_TO_PAGE:
      return goToPage(action.entityName, action.queryKey, action.page, state);
    case EntityHelperActionType.UPDATE_TIMESTAMPS:
      return updateTimestamps(action.entityName, action.timestamps, state);
    default:
      return state;
  }
};
