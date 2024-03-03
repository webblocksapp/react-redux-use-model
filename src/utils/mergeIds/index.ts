import { Pagination } from '@interfaces';
import {
  calcPaginationIndexes,
  mergeUniqueIds,
  replaceArrayPortion,
} from '@utils';

export const mergeIds = (
  originalIds: string[],
  newIds: string[],
  pagination?: Pagination
) => {
  if (pagination) {
    const { startIndex, endIndex } = calcPaginationIndexes({
      page: pagination.page,
      size: pagination.size,
    });

    return replaceArrayPortion({
      originalArray: originalIds,
      replacementArray: newIds,
      startIndex,
      endIndex,
      keepEmptyPositions: true,
      removeDuplicates: true,
    });
  } else {
    return mergeUniqueIds(originalIds, newIds);
  }
};
