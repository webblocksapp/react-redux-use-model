import { normalizeObject } from '@utils';

describe('normalizeObject', () => {
  it('CASE-1', () => {
    expect(normalizeObject({ id: '1', name: 'Name 1' })).toMatchObject({
      '1': { id: '1', name: 'Name 1' },
    });
  });
});
