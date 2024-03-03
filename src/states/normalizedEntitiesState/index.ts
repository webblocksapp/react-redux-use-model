import { EntityActionType } from '@constants';
import { EntityAction, NormalizedEntitiesState } from '@interfaces';
import { list, goToPage } from './handlers';

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
        action.queryKey,
        action.queryData,
        state
      );
    case EntityActionType.GO_TO_PAGE:
      return goToPage(action.entityName, action.queryKey, action.page, state);
    default:
      return state;
  }
};
