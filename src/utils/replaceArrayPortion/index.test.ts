import { replaceArrayPortion } from '@utils';

describe('replaceArrayPortion', () => {
  it('Original array positions are replaced by replacement array', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const replacementArray = [9, 8, 7];

    expect(
      replaceArrayPortion({
        originalArray,
        replacementArray,
        startIndex: 0,
        endIndex: 2,
      })
    ).toMatchObject([9, 8, 7, 4, 5]);
  });

  it('End index outside of length range', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const replacementArray = [9, 8, 7];

    expect(
      replaceArrayPortion({
        originalArray,
        replacementArray,
        startIndex: 2,
        endIndex: 12,
      })
    ).toMatchObject([1, 2, 9, 8, 7]);
  });

  it('Replacement array is lower than indexes count', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const replacementArray = [9, 8];

    expect(
      replaceArrayPortion({
        originalArray,
        replacementArray,
        startIndex: 0,
        endIndex: 2,
      })
    ).toMatchObject([9, 8, 4, 5]);
  });

  it('Replacement array is lower than indexes count keeping empty positions', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const replacementArray = [9, 8];

    expect(
      replaceArrayPortion({
        originalArray,
        replacementArray,
        startIndex: 0,
        endIndex: 2,
        keepEmptyPositions: true,
      })
    ).toMatchObject([9, 8, undefined, 4, 5]);
  });

  it('Replacement array is greater than indexes count', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const replacementArray = [9, 8, 10];

    expect(
      replaceArrayPortion({
        originalArray,
        replacementArray,
        startIndex: 0,
        endIndex: 1,
      })
    ).toMatchObject([9, 8, 3, 4, 5]);
  });

  it('Empty array is replaced and added empty positions', () => {
    const originalArray: Array<number> = [];
    const replacementArray = [9, 8, 10];

    expect(
      replaceArrayPortion({
        originalArray,
        replacementArray,
        startIndex: 2,
        endIndex: 4,
        keepEmptyPositions: true,
      })
    ).toMatchObject([undefined, undefined, 9, 8, 10]);
  });

  it('Added new items with indexes outside of range', () => {
    const originalArray: Array<number> = [];
    const replacementArray = [9, 8, 10];

    expect(
      replaceArrayPortion({
        originalArray,
        replacementArray,
        startIndex: 2,
        endIndex: 4,
      })
    ).toMatchObject([9, 8, 10]);
  });

  it('Added new items with indexes outside of range keeping empty positions', () => {
    const originalArray: Array<number> = [];
    const replacementArray = [9, 8, 10];

    expect(
      replaceArrayPortion({
        originalArray,
        replacementArray,
        startIndex: 2,
        endIndex: 4,
        keepEmptyPositions: true,
      })
    ).toMatchObject([undefined, undefined, 9, 8, 10]);
  });
});
