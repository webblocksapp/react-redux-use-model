import { calcTotalPages } from '@utils';

describe('calcTotalPages', () => {
  it('CASE-1', () => {
    expect(calcTotalPages({ size: 10, totalElements: 10 })).toBe(1);
    expect(calcTotalPages({ size: 10, totalElements: 9 })).toBe(1);
    expect(calcTotalPages({ size: 10, totalElements: 30 })).toBe(3);
    expect(calcTotalPages({ size: 10, totalElements: 31 })).toBe(4);
  });
});
