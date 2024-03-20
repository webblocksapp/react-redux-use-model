import { sortArrayWithNulls } from '@utils';

describe('sortArrayWithNulls', () => {
  it('Sort an array keeping empty positions', () => {
    expect(sortArrayWithNulls([1, 5, 6, null, null, 4, null, 2])).toEqual([
      1,
      2,
      4,
      null,
      null,
      5,
      null,
      6,
    ]);
  });
});
