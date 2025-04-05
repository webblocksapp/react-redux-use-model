import { EntityActionType, ListMode } from '@constants';
import {
  AnyObject,
  Entity,
  ForeignKey,
  Id,
  Pagination,
  PaginationParams,
  StringKey,
} from '@interfaces';

export type BuildModelMethodOptions = {
  withResponse?: boolean;
};

export type QueryHandlers<
  TEntity extends Entity,
  T extends { [K in keyof T]: T[K] } = { [key: string]: QueryHandler<TEntity> }
> = {
  [K in keyof T]: QueryHandler<TEntity>;
};

export type ListApiFnParams = [PaginationParams, ...args: any];

export type ListApiFn<
  TEntity extends Entity,
  TParams extends ListApiFnParams = ListApiFnParams
> = (...args: TParams) => Promise<ListResponse<TEntity>>;

export type ListQueryHandler<
  TEntity extends Entity,
  TParams extends ListApiFnParams = ListApiFnParams
> = {
  apiFn: ListApiFn<TEntity, TParams>;
  action: EntityActionType.LIST;
  onSuccess?: (
    data: Awaited<ReturnType<ListQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type CreateApiFnParams<TEntity extends Entity> = [TEntity, ...args: any];

export type CreateApiFn<
  TEntity extends Entity,
  TParams extends CreateApiFnParams<TEntity> = CreateApiFnParams<TEntity>
> = (...args: TParams) => Promise<CreateResponse<TEntity>>;

export type CreateQueryHandler<
  TEntity extends Entity,
  TParams extends CreateApiFnParams<TEntity> = CreateApiFnParams<TEntity>
> = {
  apiFn: CreateApiFn<TEntity, TParams>;
  action: EntityActionType.CREATE;
  onSuccess?: (
    data: Awaited<ReturnType<CreateQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type UpdateApiFnParams<TEntity extends Entity> = [
  Id,
  TEntity,
  ...args: any
];

export type UpdateApiFn<
  TEntity extends Entity,
  TParams extends UpdateApiFnParams<TEntity> = UpdateApiFnParams<TEntity>
> = (...args: TParams) => Promise<UpdateResponse<TEntity>>;

export type UpdateQueryHandler<
  TEntity extends Entity,
  TParams extends UpdateApiFnParams<TEntity> = UpdateApiFnParams<TEntity>
> = {
  apiFn: UpdateApiFn<TEntity, TParams>;
  action: EntityActionType.UPDATE;
  onSuccess?: (
    data: Awaited<ReturnType<UpdateQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type ReadApiFnParams = [Id, ...args: any];

export type ReadApiFn<
  TEntity extends Entity,
  TParams extends ReadApiFnParams = ReadApiFnParams
> = (...args: TParams) => Promise<ReadResponse<TEntity>>;

export type ReadQueryHandler<
  TEntity extends Entity,
  TParams extends ReadApiFnParams = ReadApiFnParams
> = {
  apiFn: ReadApiFn<TEntity, TParams>;
  action: EntityActionType.READ;
  onSuccess?: (
    data: Awaited<ReturnType<ReadQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type RemoveApiFnParams = [Id, ...args: any];

export type RemoveApiFn<
  TEntity extends Entity,
  TParams extends RemoveApiFnParams = RemoveApiFnParams
> = (...args: TParams) => Promise<RemoveResponse<TEntity>>;

export type RemoveQueryHandler<
  TEntity extends Entity,
  TParams extends RemoveApiFnParams = RemoveApiFnParams
> = {
  apiFn: RemoveApiFn<TEntity, TParams>;
  action: EntityActionType.REMOVE;
  onSuccess?: (
    data: Awaited<ReturnType<RemoveQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type CrudQueryHandlers<TEntity extends Entity> = {
  list: ListQueryHandler<TEntity>;
  create: CreateQueryHandler<TEntity>;
  update: UpdateQueryHandler<TEntity>;
  remove: RemoveQueryHandler<TEntity>;
  read: ReadQueryHandler<TEntity>;
};

export type ListResponse<TEntity extends Entity> = {
  data: Array<TEntity>;
  pagination?: Pagination;
};

export type CreateResponse<TEntity extends Entity> = {
  data: TEntity;
};

export type UpdateResponse<TEntity extends Entity> = {
  data: TEntity;
};

export type ReadResponse<TEntity extends Entity> = {
  data: TEntity;
};

export type RemoveResponse<TEntity extends Entity> = {
  data: TEntity;
};

export type QueryHandler<TEntity extends Entity = Entity> =
  | ListQueryHandler<TEntity>
  | CreateQueryHandler<TEntity>
  | UpdateQueryHandler<TEntity>
  | ReadQueryHandler<TEntity>
  | RemoveQueryHandler<TEntity>;

export type ExtractHandler<
  TEntity extends Entity,
  T extends { [K in keyof T]: QueryHandler<TEntity> },
  TEntityActionType extends EntityActionType
> = Extract<T[StringKey<keyof T>], { action: TEntityActionType }>;

export type NormalizeEntity<T extends AnyObject> = {
  [K in keyof T]: T[K] extends Array<{ id?: string }>
    ? Array<string>
    : T[K] extends { id?: string }
    ? string
    : T[K] extends Array<{ id?: string }> | undefined
    ? Array<string> | undefined
    : T[K] extends { id?: string } | undefined
    ? string | undefined
    : T[K];
};

export type ModelSchema<TEntity extends Entity = Entity> = {
  foreignKeys?: Array<ForeignKey>;
  relationships?: Array<{
    fieldName: string;
    entityName: string | ((entity: TEntity) => string | undefined);
  }>;
};

export type ApiFnParameters<
  TEntity extends Entity,
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType
> = Parameters<Extract<TQueryHandler, { action: TEntityActionType }>['apiFn']>;

export type ExtractQueryHandlerApiFnParameters<
  TEntity extends Entity,
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType
> = Parameters<Extract<TQueryHandler, { action: TEntityActionType }>['apiFn']>;

export type ExtractApiFnParametersArg1<
  TEntity extends Entity,
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType,
  TApiFnParameters extends ApiFnParameters<
    TEntity,
    TQueryHandler,
    TEntityActionType
  >
> = TApiFnParameters extends [infer Arg1, ...infer _] ? Arg1 : never;

export type ExcludeApiFnParametersArg1<
  TEntity extends Entity,
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType,
  TApiFnParameters extends ApiFnParameters<
    TEntity,
    TQueryHandler,
    TEntityActionType
  >
> = TApiFnParameters extends [infer _, ...infer Rest] ? Rest : never;

export type InvalidateQueryStrategy =
  | { strategy: 'onFilterChange' }
  | { strategy: 'always' }
  | { strategy: 'custom'; when: () => boolean };

export type ModelMethodParameters<
  TEntity extends Entity,
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType
> = TEntityActionType extends EntityActionType.LIST
  ? [
      {
        queryKey: string;
        invalidateQuery?: InvalidateQueryStrategy;
        mode?: ListMode;
        paginationParams: ExtractApiFnParametersArg1<
          TEntity,
          TQueryHandler,
          TEntityActionType,
          ExtractQueryHandlerApiFnParameters<
            TEntity,
            TQueryHandler,
            TEntityActionType
          >
        >;
      },
      ...ExcludeApiFnParametersArg1<
        TEntity,
        TQueryHandler,
        TEntityActionType,
        ExtractQueryHandlerApiFnParameters<
          TEntity,
          TQueryHandler,
          TEntityActionType
        >
      >
    ]
  : ApiFnParameters<TEntity, TQueryHandler, TEntityActionType>;
