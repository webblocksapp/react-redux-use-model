import { CrudOperation, Pagination } from '@interfaces';
import { calcTotalPages } from '@utils';

export const handlePagination = (args: {
  pagination: Pagination;
  operation: CrudOperation;
}): Pagination => {
  const { pagination, operation } = args;

  switch (operation) {
    case 'create': {
      const totalElements = pagination.totalElements + 1;
      return {
        ...pagination,
        totalElements,
        totalPages: calcTotalPages({ totalElements, size: pagination.size }),
      };
    }
    case 'remove': {
      const totalElements = pagination.totalElements - 1;
      return {
        ...pagination,
        totalElements,
        totalPages: calcTotalPages({ totalElements, size: pagination.size }),
      };
    }
    default:
      return pagination;
  }
};
