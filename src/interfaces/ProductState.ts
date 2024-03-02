import { Product, StateQuery } from '@interfaces';

export type ProductState = {
  byId: {
    [id: string]: Product;
  };
  allIds: Array<string>;
  queries: Array<StateQuery>;
};
