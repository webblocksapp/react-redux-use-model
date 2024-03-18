import { calcPage } from '@utils';

describe('calcPage', () => {
  it('Calc page without any size multiplier', () => {
    expect(calcPage({ page: 1, size: 10 })).toBe(1);
  });

  it('Calc page with size multiplier', () => {
    expect(calcPage({ page: 1, size: 10, sizeMultiplier: 5 })).toBe(0);
  });

  it('Calc page with size multiplier outside the size', () => {
    expect(calcPage({ page: 6, size: 10, sizeMultiplier: 5 })).toBe(1);
  });
});
