import { ProductActionType as ActionType } from '@examples/constants';
import { Product } from '@examples/interfaces';
import { QueryState } from '@interfaces';

export type ProductAction = {
  type: ActionType.LIST;
  products: Product[];
  componentId?: string;
  pagination?: QueryState['pagination'];
};
