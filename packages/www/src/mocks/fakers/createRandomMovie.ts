import { faker } from '@faker-js/faker';
import { Movie } from '@interfaces/Movie';
import { movies } from '@mocks/data/movies';

export const createRandomMovie = (data?: Partial<Movie>): Movie => {
  const serialId = movies.length + 1;
  return {
    id: serialId,
    name: faker.lorem.sentence({ min: 1, max: 2 }),
    ...data,
  };
};
