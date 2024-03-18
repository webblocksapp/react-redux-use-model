import { calcPage } from '@utils';

describe('calcPage', () => {
  it('Calc page without any size multiplier', () => {
    expect(calcPage({ page: 0, size: 10 })).toBe(0);
  });

  it('Calc page with size multiplier', () => {
    expect(calcPage({ page: 0, size: 10, sizeMultiplier: 5 })).toBe(0);
    expect(calcPage({ page: 1, size: 10, sizeMultiplier: 5 })).toBe(0);
    expect(calcPage({ page: 2, size: 10, sizeMultiplier: 5 })).toBe(0);
    expect(calcPage({ page: 3, size: 10, sizeMultiplier: 5 })).toBe(0);
    expect(calcPage({ page: 4, size: 10, sizeMultiplier: 5 })).toBe(0);
    expect(calcPage({ page: 5, size: 10, sizeMultiplier: 5 })).toBe(1);
    expect(calcPage({ page: 6, size: 10, sizeMultiplier: 5 })).toBe(1);
    expect(calcPage({ page: 7, size: 10, sizeMultiplier: 5 })).toBe(1);
    expect(calcPage({ page: 8, size: 10, sizeMultiplier: 5 })).toBe(1);
    expect(calcPage({ page: 9, size: 10, sizeMultiplier: 5 })).toBe(1);
  });

  it('Calc page with size multiplier and non zero based', () => {
    expect(
      calcPage({ page: 1, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(1);
    expect(
      calcPage({ page: 2, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(1);
    expect(
      calcPage({ page: 3, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(1);
    expect(
      calcPage({ page: 4, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(1);
    expect(
      calcPage({ page: 5, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(1);
    expect(
      calcPage({ page: 6, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(2);
    expect(
      calcPage({ page: 7, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(2);
    expect(
      calcPage({ page: 8, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(2);
    expect(
      calcPage({ page: 9, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(2);
    expect(
      calcPage({ page: 10, size: 10, sizeMultiplier: 5, zeroBased: false })
    ).toBe(2);
  });
});
