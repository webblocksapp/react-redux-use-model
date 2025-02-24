import { useMovieModel } from './useMovieModel';
import { useSelector } from 'react-redux';
import { createRandomMovie } from '@mocks/fakers';
import { Id } from 'react-redux-use-model';
import { RootState } from '@store';

export interface MovieItemProps {
  movieId?: Id;
  index: number;
}

export const MovieItem: React.FC<MovieItemProps> = ({ movieId, index }) => {
  const movieModel = useMovieModel();
  const { data: movie, loading } = useSelector((state: RootState) =>
    movieModel.selectEntity(state, movieId)
  );

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
    <div
      id={String(movie?.id)}
      style={{ border: '1px solid gray', padding: 5 }}
    >
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
            {index + 1}. Name: {movie?.name}
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
