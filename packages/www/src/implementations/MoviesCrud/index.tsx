import { Pagination } from '@components/Pagination';
import { SearchField } from '@components/SearchField';
import { QueryKey } from './enums';
import { PlusIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { RootState } from '@store';
import { useMovieModel } from './useMovieModel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PaginationParams, useDebounce } from 'react-redux-use-model';
import {
  Body1,
  Body2,
  Box,
  Button,
  Icon,
  SkeletonLoader,
  Stack,
  StackProps,
} from 'reactjs-ui-core';

export interface MoviesCrudProps extends StackProps {}

export const MoviesCrud: React.FC<MoviesCrudProps> = (props) => {
  const movieModel = useMovieModel();
  const [params, setParams] = useState<PaginationParams>({
    _page: 0,
    _size: 10,
  });

  const query = useSelector(movieModel.selectPaginatedQuery);
  const entities = useSelector((state: RootState) =>
    movieModel.selectEntities(state, query?.ids)
  );
  const criteria = params._filter;
  const hasRecords = entities.length;

  const search = useDebounce((criteria: string) => {
    setParams({
      _page: 0,
      _size: 18,
      _filter: criteria,
    });
  }, 300);

  useEffect(() => {
    if (criteria) {
      movieModel.list({
        queryKey: QueryKey.MoviesFilteredList,
        invalidateQuery: { strategy: 'onFilterChange' },
        paginationParams: params,
      });
    } else {
      movieModel.list({
        queryKey: QueryKey.MoviesList,
        paginationParams: params,
      });
    }
  }, [params]);

  return (
    <Stack
      overflow="auto"
      display="grid"
      gridTemplateRows="auto 1fr"
      height="100%"
      {...props}
    >
      <Stack
        display="flex"
        direction="row"
        justifyContent="space-between"
        p={2}
        pb={0}
      >
        <Stack spacing={1} direction="row" display="flex" alignItems="center">
          <Icon render={VideoCameraIcon} />
          <Body1 fontWeight={500}>Movies</Body1>
        </Stack>
        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          color="secondary"
        >
          Create Movie
          <Icon strokeWidth={2} ml={1} render={PlusIcon} />
        </Button>
      </Stack>
      <Stack
        overflow="auto"
        display="grid"
        gridTemplateRows="auto 1fr"
        spacing={3}
        py={2}
      >
        <Box px={2}>
          <SearchField onChange={search} />
        </Box>

        {hasRecords ? (
          <Stack
            display="grid"
            gridTemplateRows="1fr auto"
            overflow="auto"
            spacing={2}
          >
            <Stack px={2} overflow="auto" spacing={2}>
              {entities.map((entity) => (
                <SkeletonLoader key={entity.id} loading={entity.loading}>
                  <Box>
                    {entity.data?.name}
                    {/* <MovieListItem movie={entity.data} /> */}
                  </Box>
                </SkeletonLoader>
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
        ) : (
          <></>
        )}
        {!hasRecords && Boolean(criteria) ? (
          <Body2 px={2} textAlign="center" fontWeight={500}>
            No search results found.
          </Body2>
        ) : (
          <></>
        )}
        {!hasRecords && !Boolean(criteria) ? (
          <Body2 px={2} textAlign="center" fontWeight={500}>
            No records found.
          </Body2>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};
