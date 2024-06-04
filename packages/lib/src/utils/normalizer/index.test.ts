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
      comments: {
        '1': { id: 1, detail: 'Nice shoes' },
        '2': { id: 2, detail: 'Excellent shoes' },
        '3': { id: 3, detail: 'Good product' },
      },
    });
  });

  it('Array with an entity with nested sub-entities and map', () => {
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
    const result = normalizer(data, 'products', [
      { fieldName: 'comments', newFieldName: 'videos.comments' },
    ]);
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
      ['videos.comments']: {
        '1': { id: 1, detail: 'Nice shoes' },
        '2': { id: 2, detail: 'Excellent shoes' },
        '3': { id: 3, detail: 'Good product' },
      },
    });
  });

  it('Dynamic mapping', () => {
    const data = [
      {
        id: '1a',
        data: { id: '1a', name: 'Nike Black Shoes' },
        type: 'Clothes',
      },
      {
        id: '1b',
        data: { id: '1b', firstName: 'William' },
        type: 'Contact',
      },
    ];
    const result = normalizer(data, 'searchResults', [
      {
        fieldName: 'data',
        newFieldName: (entity) => {
          const value = entity as (typeof data)[0];
          switch (value.type) {
            case 'Clothes':
              return 'clothes';
            case 'Contact':
              return 'contacts';
            default:
              return '';
          }
        },
      },
    ]);

    expect(result).toEqual({
      searchResults: {
        '1a': {
          id: '1a',
          data: '1a',
          type: 'Clothes',
        },
        '1b': {
          id: '1b',
          data: '1b',
          type: 'Contact',
        },
      },
      clothes: {
        '1a': { id: '1a', name: 'Nike Black Shoes' },
      },
      contacts: {
        '1b': { id: '1b', firstName: 'William' },
      },
    });
  });
});
