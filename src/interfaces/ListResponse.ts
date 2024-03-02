export type ListResponse<T> = {
  totalPages: number;
  totalElements: number;
  content: Array<T>;
  pageable: {
    offset: number;
    pageSize: 0;
    pageNumber: 0;
  };
};
