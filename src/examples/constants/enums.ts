export enum EntityName {
  Products = 'products',
  Videos = 'videos',
  VideosComments = 'videosComments',
}

export enum QueryKey {
  ProductList = 'ProductList',
  ProductPaginatedList = 'ProductPaginatedList',
  ProductPaginatedFilteredList = 'ProductPaginatedFilteredList',
  ProductPaginatedEntitiesList = 'ProductPaginatedList',
  ProductCrud = 'ProductCrud',
  VideoList = 'VideoList',
  VideosDropdown = 'VideosDropdown',
}

export enum ProductActionType {
  LIST = 'PRODUCT:LIST',
  CREATE = 'PRODUCT:CREATE',
  UPDATE = 'PRODUCT:UPDATE',
  REMOVE = 'PRODUCT:REMOVE',
}
