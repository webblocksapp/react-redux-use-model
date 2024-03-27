import { getStringArrayChanges } from '@utils';

describe('getStringArrayChanges', () => {
  it('Common scenario', () => {
    expect(getStringArrayChanges(['1', '2', '3'], ['2', '3'])).toEqual({
      forRemove: ['1'],
      forAdd: [],
    });
  });

  it('All items for remove', () => {
    expect(getStringArrayChanges(['1', '2', '3'], [])).toEqual({
      forRemove: ['1', '2', '3'],
      forAdd: [],
    });
  });

  it('All items for add', () => {
    expect(getStringArrayChanges([], ['1', '2', '3'])).toEqual({
      forRemove: [],
      forAdd: ['1', '2', '3'],
    });
  });
});
