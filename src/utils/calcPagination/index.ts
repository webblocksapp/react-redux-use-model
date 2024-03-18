import { Pagination } from '@interfaces';
import {
  calcPageWithSizeMultiplier,
  calcPageSize,
  calcTotalPages,
} from '@utils';

export const calcPagination = (
  args: Pagination & { sizeMultiplier?: number }
): Pagination => {
  const { size, page, sizeMultiplier, totalElements } = args;
  return {
    totalElements,
    size: calcPageSize({ size, sizeMultiplier }),
    page: calcPageWithSizeMultiplier({ page, size, sizeMultiplier }),
    totalPages: calcTotalPages({ totalElements, size, sizeMultiplier }),
  };
};
