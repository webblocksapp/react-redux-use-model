import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, H5, Stack } from 'reactjs-ui-core';
import { QueryKey } from './enums';
import { useMovieModel } from './useMovieModel';
import { MovieItem } from './MovieItem';
import { createRandomMovie } from '@mocks/fakers';
import { Pagination } from '@components/Pagination';
import { SearchField } from '@components/SearchField';
import { Button } from '@components/Button';

export const MoviesCrud: React.FC = () => {
  const movieModel = useMovieModel();
  const query = useSelector(movieModel.selectPaginatedQuery);
  const [params, setParams] = useState({ _page: 0, _size: 10, _filter: '' });

  const create = () => {
    movieModel.create(createRandomMovie());
  };

  useEffect(() => {
    movieModel.list({
      queryKey: QueryKey.MoviesCrud,
      paginationParams: params,
    });
  }, [params]);

  return (
    <Stack p={2} spacing={1}>
      <H5 fontWeight={500}>One Million Movies</H5>
      <Box display="grid" gridTemplateColumns="1fr auto" columnGap={1}>
        <SearchField />
        <Button
          sx={{ height: '100%', minWidth: '210px' }}
          color="secondary"
          onClick={create}
          disabled={query.creating}
        >
          {query.creating ? `Creating Random Movie...` : `Create Random Movie`}
        </Button>
      </Box>
      <Stack spacing={1}>
        {query?.ids?.map((id, index) => (
          <MovieItem
            index={index}
            key={id}
            movieId={id}
            pagination={query?.pagination}
          />
        ))}
      </Stack>
      <Pagination
        page={query?.pagination?.page}
        count={query?.pagination?.totalPages}
        onChange={async (page) =>
          setParams((prev) => ({ ...prev, _page: page }))
        }
      />
    </Stack>
  );
};
