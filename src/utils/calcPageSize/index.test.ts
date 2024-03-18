import { calcPageSize } from '@utils';

describe('calcPageSize', () => {
  it('Calc page size with no multiplier', () => {
    expect(calcPageSize({ size: 10 })).toBe(10);
  });

  it('Calc page size with multiplier', () => {
    expect(calcPageSize({ size: 10, sizeMultiplier: 5 })).toBe(50);
  });

  it('Calc page size with invalid multiplier', () => {
    expect(calcPageSize({ size: 10, sizeMultiplier: 0 })).toBe(10);
  });
});
