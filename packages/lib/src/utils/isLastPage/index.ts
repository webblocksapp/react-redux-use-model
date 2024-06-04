import { calcTotalPages } from '@utils';

export const isLastPage = (args: {
  totalElements: number;
  size: number;
  page: number;
}) => {
  const { totalElements, size, page } = args;
  return page >= calcTotalPages({ size, totalElements }) - 1;
};
