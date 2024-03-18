import { Pagination } from '@interfaces';
import {
  calcPaginationIndexes,
  mergeUniqueIds,
  replaceArrayPortion,
} from '@utils';

export const mergeIds = (
  originalIds: string[],
  newIds: string[],
  pagination?: Pagination,
  options?: { replaceWhenEmpty: boolean }
) => {
  if (pagination) {
    const { startIndex, endIndex } = calcPaginationIndexes({
      page: pagination.page,
      size: pagination.size,
    });

    console.log(pagination, { startIndex, endIndex });

    return replaceArrayPortion({
      originalArray: originalIds,
      replacementArray: newIds,
      startIndex,
      endIndex,
      keepEmptyPositions: true,
      removeDuplicates: true,
      ...options,
    });
  } else {
    return mergeUniqueIds(originalIds, newIds);
  }
};
