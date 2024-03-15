import { mergeQueries } from '@utils';

describe('mergeQueries', () => {
  it('Merge query with no existing queries.', () => {
    const result = mergeQueries({
      queries: [],
      queryKey: 'QueryKey',
      ids: ['1', '2'],
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2'],
        pagination: undefined,
      },
    ]);
  });

  it('Merge query with existing queries.', () => {
    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          pagination: undefined,
        },
      ],
      queryKey: 'QueryKey',
      ids: ['3', '4'],
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2', '3', '4'],
        pagination: {},
      },
    ]);
  });

  it('Return existing queries when queryKey is undefined.', () => {
    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          pagination: undefined,
        },
      ],
      queryKey: undefined,
      ids: ['3', '4'],
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2'],
        pagination: undefined,
      },
    ]);
  });

  it('Merge query with existing queries and pagination.', () => {
    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
        },
      ],
      queryKey: 'QueryKey',
      ids: ['3', '4'],
      pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 },
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2', undefined, undefined, '3', '4'],
        pagination: {
          pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 },
        },
      },
    ]);
  });

  it('Merge query with existing queries and pagination removing duplicates.', () => {
    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2', '3', '4', '5'],
          pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
        },
      ],
      queryKey: 'QueryKey',
      ids: ['4', '5'],
      pagination: { page: 1, size: 2, totalElements: 5, totalPages: 3 },
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2', '4', '5'],
        pagination: {
          pagination: { page: 1, size: 2, totalElements: 5, totalPages: 3 },
        },
      },
    ]);
  });

  it('Merge query with page override.', () => {
    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
        },
      ],
      queryKey: 'QueryKey',
      ids: ['3', '4'],
      pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 },
      currentPage: 1, // <-- Page override.
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2', undefined, undefined, '3', '4'],
        pagination: {
          pagination: { page: 1, size: 2, totalElements: 6, totalPages: 3 },
        },
      },
    ]);
  });

  it('Adds a new query.', () => {
    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey1',
          ids: ['1', '2'],
          pagination: undefined,
        },
      ],
      queryKey: 'QueryKey2',
      ids: ['1', '2'],
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey1',
        ids: ['1', '2'],
        pagination: undefined,
      },
      {
        queryKey: 'QueryKey2',
        ids: ['1', '2'],
        pagination: undefined,
      },
    ]);
  });
});
