import { calcPageWithSizeMultiplier } from '@utils';

describe('calcPageWithSizeMultiplier', () => {
  it('Calc page without any size multiplier', () => {
    expect(calcPageWithSizeMultiplier({ page: 0, size: 10 })).toBe(0);
  });

  it('Calc page with size multiplier', () => {
    expect(
      calcPageWithSizeMultiplier({ page: 0, size: 10, sizeMultiplier: 5 })
    ).toBe(0);
    expect(
      calcPageWithSizeMultiplier({ page: 1, size: 10, sizeMultiplier: 5 })
    ).toBe(0);
    expect(
      calcPageWithSizeMultiplier({ page: 2, size: 10, sizeMultiplier: 5 })
    ).toBe(0);
    expect(
      calcPageWithSizeMultiplier({ page: 3, size: 10, sizeMultiplier: 5 })
    ).toBe(0);
    expect(
      calcPageWithSizeMultiplier({ page: 4, size: 10, sizeMultiplier: 5 })
    ).toBe(0);
    expect(
      calcPageWithSizeMultiplier({ page: 5, size: 10, sizeMultiplier: 5 })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({ page: 6, size: 10, sizeMultiplier: 5 })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({ page: 7, size: 10, sizeMultiplier: 5 })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({ page: 8, size: 10, sizeMultiplier: 5 })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({ page: 9, size: 10, sizeMultiplier: 5 })
    ).toBe(1);
  });

  it('Calc page with size multiplier and non zero based', () => {
    expect(
      calcPageWithSizeMultiplier({
        page: 1,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({
        page: 2,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({
        page: 3,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({
        page: 4,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({
        page: 5,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(1);
    expect(
      calcPageWithSizeMultiplier({
        page: 6,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(2);
    expect(
      calcPageWithSizeMultiplier({
        page: 7,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(2);
    expect(
      calcPageWithSizeMultiplier({
        page: 8,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(2);
    expect(
      calcPageWithSizeMultiplier({
        page: 9,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(2);
    expect(
      calcPageWithSizeMultiplier({
        page: 10,
        size: 10,
        sizeMultiplier: 5,
        zeroBased: false,
      })
    ).toBe(2);
  });
});
