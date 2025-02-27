import { mergeQueries } from '@utils';

const entityName = 'TestEntity';

describe('mergeQueries', () => {
  it('Merge query with no existing queries.', () => {
    const result = mergeQueries({
      entityName,
      queries: [],
      queryKey: 'QueryKey',
      ids: ['1', '2'],
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2'],
        pagination: undefined,
        hasRecords: true,
      },
    ]);
  });

  it('Merge query with existing queries.', () => {
    mergeQueries({
      entityName,
      queries: [],
      queryKey: 'QueryKey',
      ids: ['1', '2'],
    });

    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          pagination: undefined,
          loading: false,
          listing: false,
          creating: false,
          updating: false,
          reading: false,
          removing: false,
          hasRecords: true,
        },
      ],
      entityName,
      queryKey: 'QueryKey',
      ids: ['3', '4'],
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['1', '2', '3', '4'],
        pagination: undefined,
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
          loading: false,
          listing: false,
          creating: false,
          updating: false,
          reading: false,
          removing: false,
          hasRecords: true,
        },
      ],
      entityName,
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
    mergeQueries({
      entityName,
      queries: [],
      queryKey: 'QueryKey',
      ids: ['1', '2'],
    });

    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
          loading: false,
          listing: false,
          creating: false,
          updating: false,
          reading: false,
          removing: false,
          hasRecords: false,
        },
      ],
      entityName,
      queryKey: 'QueryKey',
      ids: ['3', '4'],
      pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 },
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['3', '4'],
        pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 },
      },
    ]);
  });

  it('Merge query with existing queries and pagination removing duplicates.', () => {
    mergeQueries({
      entityName,
      queries: [],
      queryKey: 'QueryKey',
      ids: ['1', '2'],
    });

    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2', '3', '4', '5'],
          pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
          loading: false,
          listing: false,
          creating: false,
          updating: false,
          reading: false,
          removing: false,
          hasRecords: false,
        },
      ],
      entityName,
      queryKey: 'QueryKey',
      ids: ['4', '5'],
      pagination: { page: 1, size: 2, totalElements: 5, totalPages: 3 },
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['4', '5'],
        pagination: { page: 1, size: 2, totalElements: 5, totalPages: 3 },
      },
    ]);
  });

  it('Merge query with page override.', () => {
    mergeQueries({
      entityName,
      queries: [],
      queryKey: 'QueryKey',
      ids: ['1', '2'],
    });

    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2'],
          pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
          loading: false,
          listing: false,
          creating: false,
          updating: false,
          reading: false,
          removing: false,
          hasRecords: false,
        },
      ],
      entityName,
      queryKey: 'QueryKey',
      ids: ['3', '4'],
      pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 },
      currentPage: 1, // <-- Page override.
    });

    expect(result).toMatchObject([
      {
        queryKey: 'QueryKey',
        ids: ['3', '4'],
        pagination: { page: 1, size: 2, totalElements: 6, totalPages: 3 },
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
          loading: false,
          listing: false,
          creating: false,
          updating: false,
          reading: false,
          removing: false,
          hasRecords: false,
        },
      ],
      entityName,
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

  it('Merge query with existing queries and calculated pagination.', () => {
    mergeQueries({
      entityName,
      queries: [],
      queryKey: 'QueryKey',
      ids: ['1', '2', '3', '4', '5', '6'],
    });

    const result = mergeQueries({
      queries: [
        {
          queryKey: 'QueryKey',
          ids: ['1', '2', '3', '4', '5', '6'],
          pagination: { page: 0, size: 2, totalElements: 18, totalPages: 9 },
          calculatedPagination: {
            page: 0,
            size: 6,
            totalElements: 18,
            totalPages: 3,
          },
          loading: false,
          listing: false,
          creating: false,
          updating: false,
          reading: false,
          removing: false,
          hasRecords: true,
        },
      ],
      entityName,
      queryKey: 'QueryKey',
      ids: ['13', '14', '15', '16', '17', '18'],
      pagination: { page: 7, size: 2, totalElements: 18, totalPages: 3 },
      sizeMultiplier: 3,
    });

    expect(result).toEqual([
      {
        queryKey: 'QueryKey',
        ids: ['13', '14', '15', '16', '17', '18'],
        pagination: { page: 7, size: 2, totalElements: 18, totalPages: 3 },
        calculatedPagination: {
          page: 2,
          size: 6,
          totalElements: 18,
          totalPages: 3,
        },
        loading: false,
        listing: false,
        creating: false,
        updating: false,
        reading: false,
        removing: false,
        hasRecords: true,
      },
    ]);
  });
});
