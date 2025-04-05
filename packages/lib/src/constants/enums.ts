export enum EntityActionType {
  LIST = 'ENTITY:LIST',
  CREATE = 'ENTITY:CREATE',
  UPDATE = 'ENTITY:UPDATE',
  REMOVE = 'ENTITY:REMOVE',
  READ = 'ENTITY:READ',
}

export enum EntityHelperActionType {
  GO_TO_PAGE = 'ENTITY:GO_TO_PAGE',
  INVALIDATE_QUERY = 'ENTITY:INVALIDATE_QUERY',
  INITIALIZE_QUERY = 'ENTITY:INITIALIZE_QUERY',
  UPDATE_QUERY_LOADERS = 'ENTITY:UPDATE_QUERY_LOADERS',
}

export enum ListMode {
  Standard = 'Standard',
  LoadMore = 'LoadMore',
}
