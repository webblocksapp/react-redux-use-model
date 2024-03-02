import { Pagination } from '@interfaces';

/**
 * Calculates start and end indexes for pagination.
 *
 * @param pagination - The pagination parameters.
 * @param zeroBased - Flag indicating whether the indexes should be zero-based (default) or one-based.
 * @returns An object containing start and end indexes.
 * @example
 * const pagination = { size: 10, page: 2 };
 * const indexes = calcPaginationIndexes(pagination, false);
 * // Result: { startIndex: 10, endIndex: 19 }
 */
export const calcPaginationIndexes = (
  pagination: Omit<Pagination, 'totalPages' | 'totalElements'>,
  zeroBased = true
): { startIndex: number; endIndex: number } => {
  // Extract size and page from pagination parameters
  let { size, page } = pagination;
  size = Number(size);
  page = Number(page);

  // Calculate offset based on zeroBased flag
  const startIndexOffset = zeroBased ? 0 : 1;
  const endIndexOffset = zeroBased ? 1 : 0;

  // Calculate start and end indexes
  const startIndex = (page - startIndexOffset) * size;
  const endIndex = size * (page + endIndexOffset) - 1;

  // Return the result as an object
  return { startIndex, endIndex };
};
