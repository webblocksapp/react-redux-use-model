import { createRandomVideo } from '@examples/mocks/fakers';

export const videos = (quantity: number) =>
  Array(quantity)
    .fill(null)
    .map(() => createRandomVideo());
