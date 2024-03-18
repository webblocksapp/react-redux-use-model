import { isLastPage } from '@utils';

describe('isLastPage', () => {
  it('Page number is the last page', () => {
    expect(isLastPage({ page: 1, size: 10, totalElements: 20 })).toBe(true);
  });

  it('Page number is not the last page', () => {
    expect(isLastPage({ page: 0, size: 10, totalElements: 20 })).toBe(false);
  });

  it('Page number exceeds last page, is considered last page', () => {
    expect(isLastPage({ page: 2, size: 10, totalElements: 20 })).toBe(true);
    expect(isLastPage({ page: 3, size: 10, totalElements: 20 })).toBe(true);
  });
});
