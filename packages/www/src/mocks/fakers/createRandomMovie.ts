import { faker } from '@faker-js/faker';
import { Movie } from '@interfaces/Movie';
import { v4 as uuid } from 'uuid';

export const createRandomMovie = (data?: Partial<Movie>): Movie => {
  return {
    id: uuid(),
    name: faker.lorem.sentence({ min: 1, max: 4 }),
    ...data,
  };
};
