import { ProductActionType as ActionType } from '@constants';
import { ProductAction, ProductState } from '@interfaces';
import { list } from './handlers';

const initialState: ProductState = { byId: {}, allIds: [], queries: [] };

export const productState = (state = initialState, action: ProductAction) => {
  switch (action.type) {
    case ActionType.LIST:
      return list(action.products, action.componentId, state);
    default:
      return state;
  }
};
