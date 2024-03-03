import { EntityActionType } from '@constants';
import { EntityAction, NormalizedEntitiesState } from '@interfaces';
import { list } from './handlers';

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
    default:
      return state;
  }
};
