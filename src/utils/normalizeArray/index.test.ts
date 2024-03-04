import { normalizeArray } from '@utils';

describe('normalizeArray', () => {
  it('CASE-1', () => {
    expect(
      normalizeArray([
        { id: '1', name: 'Name 1' },
        { id: '2', name: 'Name 2' },
      ])
    ).toMatchObject({
      '1': { id: '1', name: 'Name 1' },
      '2': { id: '2', name: 'Name 2' },
    });
  });
});
