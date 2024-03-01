import { ProductActionType as ActionType } from '@constants';
import { ProductAction, ProductState } from '@interfaces';
import { list } from './handlers';

const initialState: ProductState = { byId: {}, allIds: [] };

export const productState = (state = initialState, action: ProductAction) => {
  switch (action.type) {
    case ActionType.LIST:
      return list(action.products, state);
    default:
      return state;
  }
};
