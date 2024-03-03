import { createRandomProduct } from '@examples/mocks/fakers';

export const products = (quantity: number) =>
  Array(quantity)
    .fill(null)
    .map(() => createRandomProduct());
