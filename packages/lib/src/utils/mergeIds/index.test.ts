import { mergeIds } from '@utils';

describe('mergeIds', () => {
  it('Merge unique ids', () => {
    const ids = mergeIds(['1', '2', '3'], ['4', '5', '1']);
    expect(ids).toMatchObject(['1', '2', '3', '4', '5']);
  });

  it('Merge unique ids when original ids are empty', () => {
    const ids = mergeIds([], ['1'], {
      totalElements: 1,
      size: 50,
      page: 0,
      totalPages: 1,
    });
    expect(ids).toMatchObject(['1']);
  });

  it('Merge unique ids with pagination', () => {
    const ids = mergeIds(['1', '2'], ['4', '5'], {
      page: 2,
      size: 2,
      totalElements: 6,
      totalPages: 3,
    });
    expect(ids).toMatchObject(['1', '2', undefined, undefined, '4', '5']);
  });

  it('Merge unique ids with pagination removing duplicates', () => {
    const ids = mergeIds(['1', '2', '3', '4', '5'], ['4', '5'], {
      page: 1,
      size: 2,
      totalElements: 5,
      totalPages: 3,
    });
    expect(ids).toMatchObject(['1', '2', '4', '5']);
  });
});
