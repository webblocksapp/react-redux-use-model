/**
 * Paginates an array of data in memory.
 *
 * @param {Array<T>} data - The array of data to be paginated.
 * @param {Object} pagination - The pagination configuration.
 * @param {number} pagination.page - The current page number (1-based or 0-based depending on pageAsIndex).
 * @param {number} pagination.limit - The number of items per page.
 * @param {boolean} [pagination.pageAsIndex=true] - If true, page numbers are 0-based; if false, page numbers are 1-based.
 * This means the first page would be represented by 0, the second page by 1, and so on.
 *
 * @returns {Object} An object containing paginated content and total pages.
 * @property {Array<T>} content - The paginated subset of the input data.
 * @property {number} totalPages - The total number of pages based on the given limit.
 */
export const paginateData = <T = any>(
  data: Array<T>,
  pagination: { page: number; limit: number; pageAsIndex?: boolean },
  options?: { decreasePageWhenDataIsEmpty?: boolean },
) => {
  pagination = { pageAsIndex: true, ...pagination };
  const pageOffset = pagination.pageAsIndex ? 0 : 1;
  const limit = Number(pagination.limit);
  const start = (Number(pagination.page) - pageOffset) * limit;
  const end = start + limit;
  let content = data.slice(start, end);
  let page = pagination.page;

  if (
    options?.decreasePageWhenDataIsEmpty &&
    pagination.page > 0 &&
    content.length === 0
  ) {
    page = pagination.page - 1;
    content = data.slice(start - limit, end - limit);
  }

  return {
    content,
    totalPages: Math.ceil(data.length / limit),
    page,
    limit: pagination.limit,
  };
};
