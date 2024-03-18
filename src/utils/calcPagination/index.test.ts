import { calcPagination } from '@utils';

describe('calcPagination', () => {
  it('Calculates pagination given a pagination data', () => {
    expect(
      calcPagination({ page: 0, size: 10, totalElements: 10, totalPages: 1 })
    ).toEqual({
      totalElements: 10,
      size: 10,
      page: 0,
      totalPages: 1,
    });
  });

  it('Calculates pagination given a pagination data and size multiplier', () => {
    expect(
      calcPagination({
        page: 1,
        size: 10,
        totalElements: 10,
        totalPages: 1,
        sizeMultiplier: 5,
      })
    ).toEqual({
      totalElements: 10,
      size: 50,
      page: 0,
      totalPages: 1,
    });
  });
});
