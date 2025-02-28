import { Movie } from '@interfaces/Movie';

export const movies: Movie[] = Array(1000000)
  .fill(null)
  .map((_, index) => ({ id: `${index + 1}`, name: `Movie ${index + 1}` }));
