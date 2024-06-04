import { removeArrayDuplicates } from '@utils';

describe('removeArrayDuplicates', () => {
  it('should return an array without duplicates keeping empty positions', () => {
    const arr = [
      { id: 1, name: 'Mao' },
      { id: 2, name: 'Felipe' },
      { id: 2, name: 'Felipe' },
      { id: 3, name: 'Manu' },
      { id: 2, name: 'Felipe' },
    ];
    expect(
      removeArrayDuplicates(arr, { keepEmptyPositions: true })
    ).toMatchObject([
      { id: 1, name: 'Mao' },
      { id: 2, name: 'Felipe' },
      undefined,
      { id: 3, name: 'Manu' },
      undefined,
    ]);
  });

  it('should return an array of primitives without duplicates', () => {
    expect(removeArrayDuplicates(['1', '2', '4', '5', '5'])).toMatchObject([
      '1',
      '2',
      '4',
      '5',
    ]);

    expect(removeArrayDuplicates(['1', '2', '4', '4', '5'])).toMatchObject([
      '1',
      '2',
      '4',
      '5',
    ]);
  });

  it('should return an array of primitives without duplicates and keeping empty positions', () => {
    expect(
      removeArrayDuplicates(['1', '2', '4', '5', '5'], {
        keepEmptyPositions: true,
      })
    ).toMatchObject(['1', '2', '4', '5', undefined]);

    expect(
      removeArrayDuplicates(['1', '2', '4', '4', '5'], {
        keepEmptyPositions: true,
      })
    ).toMatchObject(['1', '2', '4', undefined, '5']);
  });
});
