import { Id, Pagination } from 'react-redux-use-model';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { useMovieModel } from './useMovieModel';
import { createRandomMovie } from '@mocks/fakers';
import { Body1, Box, SkeletonLoader, Stack } from 'reactjs-ui-core';
import { Button } from '@components/Button';

export interface MovieItemProps {
  movieId?: Id;
  pagination?: Pagination;
  index: number;
}

export const MovieItem: React.FC<MovieItemProps> = ({ movieId }) => {
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
    <SkeletonLoader loading={loading}>
      <Box
        p={1}
        display="flex"
        alignItems="center"
        border={(theme) => `1px solid ${theme.palette.secondary.main}`}
        minHeight={60}
      >
        <Stack
          flex={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Body1
            color="text.secondary"
            skeletonText={'XXXXXXXXXXX'}
            fontWeight={500}
          >
            {movieId}. {movie?.name}
          </Body1>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button onClick={update}>
              {movieModel.updateState.isLoading ? 'Updating...' : 'Update'}
            </Button>
            <Button onClick={remove}>
              {movieModel.removeState.isLoading ? 'Removing...' : 'Remove'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </SkeletonLoader>
  );
};
