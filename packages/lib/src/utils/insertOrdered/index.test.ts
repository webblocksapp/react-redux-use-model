import { insertOrdered } from '@utils';

describe('insertOrdered', () => {
  it('Insert previous data ordered by name', () => {
    expect(
      insertOrdered(
        [
          { id: 1, name: 'Alberto' },
          { id: 2, name: 'Caroline' },
        ],
        { id: 3, name: 'Betty' },
        ({ existingItem, itemToInsert }) =>
          itemToInsert.name >= existingItem.name
      )
    ).toEqual([
      { id: 1, name: 'Alberto' },
      { id: 3, name: 'Betty' },
      { id: 2, name: 'Caroline' },
    ]);
  });

  it('Insert after existing data ordered by name', () => {
    expect(
      insertOrdered(
        [
          { id: 1, name: 'Alberto' },
          { id: 2, name: 'Caroline' },
        ],
        { id: 3, name: 'Louise' },
        ({ existingItem, itemToInsert }) =>
          itemToInsert.name >= existingItem.name
      )
    ).toEqual([
      { id: 1, name: 'Alberto' },
      { id: 2, name: 'Caroline' },
      { id: 3, name: 'Louise' },
    ]);
  });
});
