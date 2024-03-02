import { ProductActionType as ActionType } from '@constants';
import { Product } from '@interfaces';

export type ProductAction = {
  type: ActionType.LIST;
  products: Product[];
  componentId?: string;
};
