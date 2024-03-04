import { buildEmptyIds } from '@utils';

describe('buildEmptyIds', () => {
  it('Generate empty ids according to the given size', () => {
    let emptyIds = buildEmptyIds({ size: 10 });
    expect(emptyIds.length).toBe(10);

    emptyIds = buildEmptyIds({ size: 20 });
    expect(emptyIds.length).toBe(20);
  });
});
