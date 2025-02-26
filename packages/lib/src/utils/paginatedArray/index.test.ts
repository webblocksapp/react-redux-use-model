import { paginatedArray } from '@utils';

describe('paginatedArray', () => {
  it('Generate an paginatedArray divided in a single chunk', () => {
    const data = [1, 2];
    const result = paginatedArray(data, {
      chunkSize: 2,
      page: 0,
      totalElements: 2,
      totalPages: 1,
      size: 2,
    });
    expect(result).toMatchObject([data]);
  });

  it('Generate an paginatedArray divided in two chunks of the same size', () => {
    const half1 = Array(10).fill(1);
    const half2 = Array(10).fill(2);
    const data = half1.concat(half2);
    const result = paginatedArray(data, {
      chunkSize: 10,
      page: 0,
      totalElements: 20,
      totalPages: 2,
      size: 10,
    });
    expect(result).toMatchObject([half1, half2]);
  });

  it('Generate an paginatedArray divided in two chunks of the same size with paginatedArrays of different sizes', () => {
    const half1 = Array(10).fill(1);
    const half2 = Array(8).fill(2);
    const data = half1.concat(half2);
    const result = paginatedArray(data, {
      chunkSize: 10,
      page: 0,
      totalElements: 20,
      totalPages: 2,
      size: 10,
    });
    expect(result).toMatchObject([half1, [...half2, null, null]]);
  });
});
