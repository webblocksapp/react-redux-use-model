import { isPageBlank } from '@utils';

describe('isPageBlank', () => {
  it('Checks if the current pages are blank', () => {
    expect(isPageBlank({ page: 1, totalElements: 12, size: 10 })).toBe(false);
    expect(isPageBlank({ page: 2, totalElements: 12, size: 10 })).toBe(true);
    expect(isPageBlank({ page: 0, totalElements: 100, size: 10 })).toBe(false);
    expect(isPageBlank({ page: 9, totalElements: 100, size: 10 })).toBe(false);
    expect(isPageBlank({ page: 9, totalElements: 90, size: 10 })).toBe(true);
    expect(isPageBlank({ page: 8, totalElements: 90, size: 10 })).toBe(false);
  });
});
