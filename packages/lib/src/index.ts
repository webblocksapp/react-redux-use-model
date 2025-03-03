import { ListResponse as BaseListResponse, Entity } from './interfaces';
export { ModelProvider } from './components';
export { EntityActionType } from './constants';
export { useModel } from './hooks';
export { useDebounce, useQueryKey } from './utils';
export { withQueryKey } from './hocs';
export { normalizedEntitiesState } from './states';
export type { ModelProviderProps } from './components';
export type ListResponse<TEntity extends Entity> = {
  data: BaseListResponse<TEntity>['data'];
  pagination: Exclude<BaseListResponse<TEntity>['pagination'], undefined>;
};
export type {
  CreateQueryHandler,
  CreateResponse,
  CrudQueryHandlers,
  Id,
  InvalidateQueryStrategy,
  ListQueryHandler,
  NormalizeEntity,
  Pagination,
  PaginationParams,
  QueryHandler,
  ReadQueryHandler,
  ReadResponse,
  RemoveQueryHandler,
  RemoveResponse,
  UpdateQueryHandler,
  UpdateResponse,
} from './interfaces';
