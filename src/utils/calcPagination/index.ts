import { Pagination } from '@interfaces';
import { calcPage, calcPageSize, calcTotalPages } from '@utils';

export const calcPagination = (
  args: Pagination & { sizeMultiplier?: number }
): Pagination => {
  const { size, page, sizeMultiplier, totalElements } = args;
  return {
    totalElements,
    size: calcPageSize({ size, sizeMultiplier }),
    page: calcPage({ page, size, sizeMultiplier }),
    totalPages: calcTotalPages({ totalElements, size, sizeMultiplier }),
  };
};
