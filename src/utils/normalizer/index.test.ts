import { normalizer } from '@utils';

describe('normalizer', () => {
  it('Array with an entity without nested sub-entities', () => {
    const data = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Mario' },
    ];
    const result = normalizer(data, 'user');
    expect(result).toEqual({
      user: { '1': { id: 1, name: 'John' }, '2': { id: 2, name: 'Mario' } },
    });
  });

  it('Array with an entity with nested sub-entities', () => {
    const data = [
      {
        id: 1,
        name: 'Nike Black Shoes',
        comments: [{ id: 1, detail: 'Nice shoes' }],
      },
      {
        id: 2,
        name: 'Nike White Shoes',
        comments: [
          { id: 2, detail: 'Excellent shoes' },
          { id: 3, detail: 'Good product' },
        ],
      },
    ];
    const result = normalizer(data, 'products');
    expect(result).toEqual({
      products: {
        '1': {
          id: 1,
          name: 'Nike Black Shoes',
          comments: [1],
        },
        '2': {
          id: 2,
          name: 'Nike White Shoes',
          comments: [2, 3],
        },
      },
      ['products.comments']: {
        '1': { id: 1, detail: 'Nice shoes' },
        '2': { id: 2, detail: 'Excellent shoes' },
        '3': { id: 3, detail: 'Good product' },
      },
    });
  });
});
