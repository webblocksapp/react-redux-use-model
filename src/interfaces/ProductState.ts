import { Product } from "@interfaces";

export type ProductState = {
  byId: {
    [id: string]: Product;
  };
  allIds: Array<string>;
};
