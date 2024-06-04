import { calcPaginationLimit } from '@utils';

describe('calcPaginationLimit', () => {
  it('No last page scenario', () => {
    expect(calcPaginationLimit({ page: 0, totalElements: 20, size: 10 })).toBe(
      10
    );
    expect(calcPaginationLimit({ page: 1, totalElements: 30, size: 10 })).toBe(
      10
    );
  });

  it('Last page scenario', () => {
    expect(calcPaginationLimit({ page: 1, totalElements: 20, size: 10 })).toBe(
      10
    );
    expect(calcPaginationLimit({ page: 1, totalElements: 18, size: 10 })).toBe(
      8
    );
    expect(calcPaginationLimit({ page: 0, totalElements: 10, size: 10 })).toBe(
      10
    );
    expect(calcPaginationLimit({ page: 1, totalElements: 11, size: 10 })).toBe(
      1
    );
  });
});
