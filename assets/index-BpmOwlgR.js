const e=`import { useEffect, useState } from 'react';
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
import { RootState } from '@store';
import { Code, SkeletonLoader, Stack } from 'reactjs-ui-core';
import { Body1 } from '@components/Body1';
import { useMovieModel1 } from '@models/useMovieModel1';

export interface MoviesListProps {
  paginationSizeMultiplier?: number;
  queryKey: QueryKey;
}

export const MoviesList: React.FC<MoviesListProps> = ({
  paginationSizeMultiplier,
  queryKey,
}) => {
  const movieModel = useMovieModel1({ paginationSizeMultiplier });
  const query = useSelector(movieModel.selectPaginatedQuery);
  const [params, setParams] = useState({ _page: 0, _size: 10, _filter: '' });

  useEffect(() => {
    movieModel.list({
      queryKey,
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
            {query?.ids?.map((id) => {
              const entity = useSelector((state: RootState) =>
                movieModel.selectEntity(state, id)
              );
              return (
                <TableRow
                  key={id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <SkeletonLoader loading={entity.loading}>
                      <Body1 skeletonText="XXXXXXXXXXX">
                        {entity.data?.name}
                      </Body1>
                    </SkeletonLoader>
                  </TableCell>
                </TableRow>
              );
            })}
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
      <Body1>
        <Body1 component="span" color="text.primary">
          Size Multiplier:{' '}
        </Body1>
        <Body1 component="span">{paginationSizeMultiplier}</Body1>
      </Body1>
      <Body1 color="text.primary">Pagination Payload:</Body1>
      <Code type="content" code={JSON.stringify(params)} language="json" />
      <Stack pt={1} width="100%" direction="row" spacing={1}>
        <Stack flex={1} spacing={1}>
          <Body1 color="text.primary">Real Pagination:</Body1>
          <Code
            type="content"
            code={JSON.stringify(
              {
                size: query.pagination?.size,
                page: query.pagination?.page,
                totalElements: query.pagination?.totalElements,
                totalPages: query.pagination?.totalPages,
              },
              null,
              2
            )}
            language="json"
          />
        </Stack>
        <Stack flex={1} spacing={1}>
          <Body1 color="text.primary">Calculated Pagination:</Body1>
          <Code
            type="content"
            code={JSON.stringify(
              {
                size: query.calculatedPagination?.size,
                page: query.calculatedPagination?.page,
                totalElements: query.calculatedPagination?.totalElements,
                totalPages: query.calculatedPagination?.totalPages,
              },
              null,
              2
            )}
            language="json"
          />
        </Stack>
      </Stack>
      <Body1 color="text.primary">URL result:</Body1>
      <Code
        language="bash"
        type="content"
        code={\`/movies?_page=\${query.calculatedPagination?.page}&_size=\${query.calculatedPagination?.size}&_filter=\`}
      />
    </Stack>
  );
};
`;export{e as default};
