import { Product } from '@examples/interfaces';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';

export const createRandomProduct = (): Product => {
  return {
    id: uuid(),
    name: faker.lorem.words({ min: 1, max: 2 }),
    price: faker.number.int({ min: 100, max: 1000 }),
  };
};
