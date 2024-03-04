import { mergeUniqueIds } from '@utils';

describe('mergeUniqueIds', () => {
  it('CASE-1', () => {
    const result = mergeUniqueIds(['1', '2', '3'], ['2', '1', '4']);
    expect(result).toMatchObject(['1', '2', '3', '4']);
  });

  it('CASE-2', () => {
    const result = mergeUniqueIds(['2', '1', '4'], ['1', '2', '3']);
    expect(result).toMatchObject(['2', '1', '4', '3']);
  });
});
