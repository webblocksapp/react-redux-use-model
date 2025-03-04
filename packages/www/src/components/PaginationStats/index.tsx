import React from 'react';
import { PaginationParams, QueryState } from 'react-redux-use-model';
import { Body1, Code, Stack } from 'reactjs-ui-core';

export interface PaginationStats {
  query: QueryState;
  params: PaginationParams;
}

export const PaginationStats: React.FC<PaginationStats> = ({
  params,
  query,
}) => {
  return (
    <Stack spacing={2}>
      <Body1>
        <Body1 component="span" color="text.primary">
          Size Multiplier:{' '}
        </Body1>
        <Body1 component="span">
          {(query.calculatedPagination?.size || 0) /
            (query.pagination?.size || 1)}
        </Body1>
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
        code={`/movies?_page=${query.calculatedPagination?.page}&_size=${query.calculatedPagination?.size}&_filter=`}
      />
    </Stack>
  );
};
