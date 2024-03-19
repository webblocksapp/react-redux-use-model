import { Pagination } from '@interfaces';
import { isLastPage } from '@utils';

export const calcPaginationLimit = (
  params: Pick<Pagination, 'page' | 'size' | 'totalElements'> & {
    zeroBased?: boolean;
  }
) => {
  let { size, totalElements, page, zeroBased = true } = params;

  if (isLastPage(params)) {
    page = zeroBased ? page + 1 : params.page;
    const offset = Math.abs(totalElements - size * page);
    return size - offset;
  }

  return size;
};
