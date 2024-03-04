import { getArrayIds } from '@utils';

describe('getArrayIds', () => {
  it('CASE-1', () => {
    const ids = getArrayIds([{ id: '1' }, { id: '2' }, { id: '3' }]);
    expect(ids).toMatchObject(['1', '2', '3']);
  });

  it('CASE-2', () => {
    const ids = getArrayIds([{ id: '1' }, { id: '1' }, { id: '1' }]);
    expect(ids).toMatchObject(['1', '1', '1']);
  });
});
