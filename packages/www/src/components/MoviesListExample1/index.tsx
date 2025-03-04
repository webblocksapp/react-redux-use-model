import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QueryKey } from '@constants/enums';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Pagination } from '@components/Pagination';
import { Stack } from 'reactjs-ui-core';
import { useMovieModel1 } from '@models/useMovieModel1';
import { PaginationStats } from '@components/PaginationStats';
import { MovieListItem } from '@components/MovieListItem';

export const MoviesListExample1: React.FC = () => {
  const movieModel = useMovieModel1();
  const query = useSelector(movieModel.selectPaginatedQuery);
  const [params, setParams] = useState({ _page: 0, _size: 10, _filter: '' });

  useEffect(() => {
    movieModel.list({
      queryKey: QueryKey.MoviesListExample1,
      paginationParams: params,
    });
  }, [params]);

  return (
    <Stack spacing={1}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query?.ids?.map((id) => (
              <MovieListItem key={id} id={id} />
            ))}
          </TableBody>
        </Table>
        <Pagination
          page={query?.pagination?.page}
          count={query?.pagination?.totalPages}
          onChange={async (page) =>
            setParams((prev) => ({ ...prev, _page: page }))
          }
        />
      </TableContainer>
      <PaginationStats query={query} params={params} />
    </Stack>
  );
};
