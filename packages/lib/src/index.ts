import { ListResponse as BaseListResponse, Entity } from './interfaces';
export { ModelProvider } from './components';
export { EntityActionType } from './constants';
export { useModel } from './hooks';
export { useDebounce, useQueryKey } from './utils';
export { withQueryKey } from './hocs';
export { normalizedEntitiesState } from './states';
export type { ModelProviderProps } from './components';
export type ListResponse<TEntity extends Entity> = {
  content: BaseListResponse<TEntity>['data'];
  pagination: Exclude<BaseListResponse<TEntity>['pagination'], undefined>;
};
export type {
  CreateQueryHandler,
  CrudQueryHandlers,
  InvalidateQueryStrategy,
  ListQueryHandler,
  NormalizeEntity,
  Pagination,
  PaginationParams,
  QueryHandler,
  ReadQueryHandler,
  RemoveQueryHandler,
  UpdateQueryHandler,
  Id,
} from './interfaces';
