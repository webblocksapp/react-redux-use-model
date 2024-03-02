import { calcPaginationIndexes } from '@utils';

describe('calcPaginationIndexes', () => {
  it('CASE-1', () => {
    expect(calcPaginationIndexes({ page: 1, size: 20 }, false)).toMatchObject({
      startIndex: 0,
      endIndex: 19,
    });
  });

  it('CASE-2', () => {
    expect(calcPaginationIndexes({ page: 2, size: 20 }, false)).toMatchObject({
      startIndex: 20,
      endIndex: 39,
    });
  });

  it('CASE-3', () => {
    expect(calcPaginationIndexes({ page: 0, size: 50 }, true)).toMatchObject({
      startIndex: 0,
      endIndex: 49,
    });
  });

  it('CASE-4', () => {
    expect(calcPaginationIndexes({ page: 2, size: 10 }, false)).toMatchObject({
      startIndex: 10,
      endIndex: 19,
    });
  });
});
