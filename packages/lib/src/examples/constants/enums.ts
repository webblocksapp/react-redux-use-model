export enum EntityName {
  Animals = 'Animals',
  Products = 'products',
  Videos = 'videos',
  VideosComments = 'videosComments',
}

export enum QueryKey {
  ProductList = 'ProductList',
  FilteredProductList = 'FilteredProductList',
  ProductPaginatedList = 'ProductPaginatedList',
  ProductPaginatedFilteredList = 'ProductPaginatedFilteredList',
  ProductListLoadMore = 'ProductListLoadMore',
  ProductCrud = 'ProductCrud',
  VideoList = 'VideoList',
  VideosDropdown = 'VideosDropdown',
  FilteredAnimalList = 'FilteredAnimalList',
  AnimalList = 'AnimalList',
}

export enum ProductActionType {
  LIST = 'PRODUCT:LIST',
  CREATE = 'PRODUCT:CREATE',
  UPDATE = 'PRODUCT:UPDATE',
  REMOVE = 'PRODUCT:REMOVE',
}
