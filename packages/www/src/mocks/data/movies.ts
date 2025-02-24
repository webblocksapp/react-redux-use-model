import { Movie } from '@interfaces/Movie';
import { createMovie } from '@mocks/utils';

export const movies: Movie[] = Array(1000)
  .fill(null)
  .map(() => createMovie());
