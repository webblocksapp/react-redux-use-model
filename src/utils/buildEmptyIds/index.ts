import { v4 as uuid } from 'uuid';

export const buildEmptyIds = (params: { size: number }) => {
  const size = Number(params.size);
  return Array(size)
    .fill(null)
    .map(() => `empty-${uuid()}`);
};
