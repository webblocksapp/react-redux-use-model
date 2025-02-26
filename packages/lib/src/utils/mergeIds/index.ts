import { Pagination } from '@interfaces';
import {
  calcPaginationIndexes,
  mergeUniqueIds,
  replaceArrayPortion,
} from '@utils';

export const mergeIds = (
  originalIds: Array<string | number>,
  newIds: Array<string | number>,
  pagination?: Pagination,
  options?: { replaceWhenEmpty: boolean }
) => {
  if (pagination && pagination.totalElements === 0) {
    return [];
  } else if (pagination) {
    const { startIndex, endIndex } = calcPaginationIndexes({
      page: pagination.page,
      size: pagination.size,
      totalElements: pagination.totalElements,
    });

    return replaceArrayPortion({
      originalArray: originalIds,
      replacementArray: newIds,
      startIndex,
      endIndex,
      keepEmptyPositions: true,
      removeDuplicates: true,
      size: pagination.size,
      ...options,
    });
  } else {
    return mergeUniqueIds(originalIds, newIds);
  }
};
