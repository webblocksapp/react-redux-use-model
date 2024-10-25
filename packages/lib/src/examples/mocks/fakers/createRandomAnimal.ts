import { Animal } from '@examples/interfaces';
import { faker } from '@faker-js/faker';
import { animals } from '@examples/mocks/data/animals';

let serialId = animals.length;

export const createRandomAnimal = (): Animal => {
  serialId = serialId + 1;
  return {
    id: serialId,
    name: faker.lorem.words({ min: 1, max: 2 }),
  };
};
