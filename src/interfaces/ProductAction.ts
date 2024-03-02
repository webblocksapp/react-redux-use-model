import { ProductActionType as ActionType } from '@constants';
import { Product, StateQueryParams } from '@interfaces';

export type ProductAction = {
  type: ActionType.LIST;
  products: Product[];
  stateQueryParams?: StateQueryParams;
};
