import { removeArrayDuplicates } from '@utils';

describe('removeArrayDuplicates', () => {
  it('should return array duplicates keeping empty positions', () => {
    const arr = [
      { id: 1, name: 'Mao' },
      { id: 2, name: 'Felipe' },
      { id: 2, name: 'Felipe' },
      { id: 3, name: 'Manu' },
      { id: 2, name: 'Felipe' },
    ];
    expect(removeArrayDuplicates(arr)).toMatchObject([
      { id: 1, name: 'Mao' },
      { id: 2, name: 'Felipe' },
      undefined,
      { id: 3, name: 'Manu' },
      undefined,
    ]);
  });
});
