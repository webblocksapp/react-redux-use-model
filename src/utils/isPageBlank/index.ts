import { Pagination } from '@interfaces';
import { calcTotalPages } from '@utils';

export const isPageBlank = (
  args: Omit<Pagination, 'totalPages'> & {
    zeroBased?: boolean;
  }
) => {
  let { size, page, zeroBased = true, totalElements } = args;
  page = zeroBased ? page + 1 : page;
  const totalElementsUntilPage = page * size;
  const totalPages = calcTotalPages({ totalElements, size });
  const offset = totalElements % size;
  const delta = totalElements - totalElementsUntilPage;
  return page > totalPages || (offset === 0 && delta < 0);
};
