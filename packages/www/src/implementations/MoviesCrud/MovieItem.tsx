import { Id, Pagination } from 'react-redux-use-model';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { useMovieModel } from './useMovieModel';
import { createRandomMovie } from '@mocks/fakers';

export interface MovieItemProps {
  movieId?: Id;
  pagination?: Pagination;
  index: number;
}

export const MovieItem: React.FC<MovieItemProps> = ({
  movieId,
  index,
  pagination,
}) => {
  const movieModel = useMovieModel();
  const { data: movie, loading } = useSelector((state: RootState) =>
    movieModel.selectEntity(state, movieId)
  );
  const base = (pagination?.page || 0) * (pagination?.size || 0);

  const update = () => {
    movieId &&
      movieModel.update(movieId, {
        ...createRandomMovie(),
        id: movieId,
      });
  };

  const remove = () => {
    movieId && movieModel.remove(movieId);
  };

  return (
    <div style={{ border: '1px solid gray', padding: 5 }}>
      {loading ? (
        <>Loading...</>
      ) : (
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {index + base + 1}. {movie?.name}
          </div>
          <div>
            <button onClick={update}>
              {movieModel.updateState.isLoading ? 'Updating...' : 'Update'}
            </button>
            <button onClick={remove}>
              {movieModel.removeState.isLoading ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
