import { ProductActionType as ActionType } from '@examples/constants';
import { Product, ProductQueryData } from '@examples/interfaces';

export type ProductAction = {
  type: ActionType.LIST;
  products: Product[];
  componentId?: string;
  queryData?: ProductQueryData;
};
