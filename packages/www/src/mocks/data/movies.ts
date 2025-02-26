import { Movie } from '@interfaces/Movie';
import { createRandomMovie } from '@mocks/fakers';

export const movies: Movie[] = Array(10000)
  .fill(null)
  .map(() => createRandomMovie());
