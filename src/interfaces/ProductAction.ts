import { ProductActionType as ActionType } from '@constants';
import { Product, ProductQueryData } from '@interfaces';

export type ProductAction = {
  type: ActionType.LIST;
  products: Product[];
  componentId?: string;
  queryData?: ProductQueryData;
};
