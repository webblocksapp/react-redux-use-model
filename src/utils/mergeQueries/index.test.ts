import { mergeQueries } from '@utils';

describe('mergeQueries', () => {
  it('Merge query with no existing queries.', () => {
    const result = mergeQueries([], 'QueryKey', ['1', '2']);

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2'],
        queryData: undefined,
      },
    ]);
  });

  it('Merge query with existing queries.', () => {
    const result = mergeQueries(
      [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          queryData: undefined,
        },
      ],
      'QueryKey',
      ['3', '4']
    );

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2', '3', '4'],
        queryData: {},
      },
    ]);
  });

  it('Merge query with existing queries and pagination.', () => {
    const result = mergeQueries(
      [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          queryData: {
            pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
          },
        },
      ],
      'QueryKey',
      ['3', '4'],
      { pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 } }
    );

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2', undefined, undefined, '3', '4'],
        queryData: {
          pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 },
        },
      },
    ]);
  });

  it('Merge query with existing queries and pagination removing duplicates.', () => {
    const result = mergeQueries(
      [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2', '3', '4', '5'],
          queryData: {
            pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
          },
        },
      ],
      'QueryKey',
      ['4', '5'],
      { pagination: { page: 1, size: 2, totalElements: 5, totalPages: 3 } }
    );

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2', '4', '5'],
        queryData: {
          pagination: { page: 1, size: 2, totalElements: 5, totalPages: 3 },
        },
      },
    ]);
  });
});
