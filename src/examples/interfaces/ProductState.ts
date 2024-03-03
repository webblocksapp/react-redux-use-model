import {
  NormalizedState,
  Product,
  ProductQueryData,
} from '@examples/interfaces';

export type ProductState = NormalizedState<Product, ProductQueryData>;
