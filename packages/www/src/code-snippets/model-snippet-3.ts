//@ts-nocheck
movieModel.list({
  queryKey: QueryKey.MoviesList,
  paginationParams: { _page: 0, _size: 10, _filter: '' },
});
