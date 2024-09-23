import { removeArrayExcess } from '@utils';

describe('removeArrayExcess', () => {
  it('CASE-1', () => {
    expect(removeArrayExcess([1, 2, 3, 4], 3)).toEqual([1, 2, 3]);
  });

  it('CASE-2', () => {
    expect(removeArrayExcess([1, 2, 3, 4, 5, 6, 7, 8], 2)).toEqual([1, 2]);
  });

  it('CASE-3', () => {
    expect(removeArrayExcess([], 1)).toEqual([]);
  });

  it('CASE-4', () => {
    expect(removeArrayExcess([1], 1)).toEqual([1]);
  });
});
