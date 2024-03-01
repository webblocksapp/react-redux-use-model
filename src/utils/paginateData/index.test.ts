import { paginateData } from '@utils';

describe('paginateData', () => {
  it('should return the expected paginated data from Data Mock', () => {
    const fakeArray = [
      { name: 'Mao' },
      { name: 'Felipe' },
      { name: 'Mark' },
      { name: 'Betty' },
      { name: 'Marco' },
    ];
    expect(
      paginateData(fakeArray, { page: 0, limit: 2 }).content,
    ).toMatchObject([{ name: 'Mao' }, { name: 'Felipe' }]);
  });

  it('should return empty records when page is blank', () => {
    const fakeArray = [{ name: 'Mao' }, { name: 'Felipe' }];
    expect(
      paginateData(fakeArray, { page: 1, limit: 2 }).content,
    ).toMatchObject([]);
  });
});
