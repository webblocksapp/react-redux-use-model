import { calcTotalPages } from '@utils';

describe('calcTotalPages', () => {
  it('Calculate number of pages given a total number of elements', () => {
    expect(calcTotalPages({ size: 10, totalElements: 10 })).toBe(1);
    expect(calcTotalPages({ size: 10, totalElements: 9 })).toBe(1);
    expect(calcTotalPages({ size: 10, totalElements: 30 })).toBe(3);
    expect(calcTotalPages({ size: 10, totalElements: 31 })).toBe(4);
  });

  it('Calculate number of pages given a total number of elements and size multiplier', () => {
    expect(
      calcTotalPages({ size: 10, totalElements: 31, sizeMultiplier: 3 })
    ).toBe(2);
    expect(
      calcTotalPages({ size: 10, totalElements: 31, sizeMultiplier: 2 })
    ).toBe(2);
  });
});
