import { Pagination } from '@interfaces';

export const paginatedArray = <T extends Array<any>>(
  arr: T,
  options: { chunkSize: number } & Pagination
): Array<T> => {
  const { chunkSize = 10 } = options || {};
  const chunks = [] as Array<T>;
  const chunksNumber = Math.round(arr.length / chunkSize);

  for (let i = 0; i < chunksNumber; i++) {
    const chunk = Array(chunkSize).fill(null) as T;
    const startIndex = i * chunkSize;
    const endIndex = (i + 1) * chunkSize;
    const data = arr.slice(startIndex, endIndex);
    chunk.splice(0, data.length, ...data);
    chunks.push(chunk);
  }

  return chunks;
};
