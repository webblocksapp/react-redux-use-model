import { EntityActionType } from '@constants';
import {
  AnyObject,
  ForeignKey,
  Pagination,
  PaginationParams,
  StringKey,
} from '@interfaces';

export type BuildModelMethodOptions = { withResponse?: boolean };

export type QueryHandlers<
  TEntity extends { id: string },
  T extends { [K in keyof T]: T[K] } = { [key: string]: QueryHandler<TEntity> }
> = {
  [K in keyof T]: QueryHandler<TEntity>;
};

export type ListApiFnParams = [PaginationParams, ...args: any];

export type ListApiFn<
  TEntity extends { id: string },
  TParams extends ListApiFnParams = ListApiFnParams
> = (...args: TParams) => Promise<ListResponse<TEntity>>;

export type ListQueryHandler<
  TEntity extends { id: string },
  TParams extends ListApiFnParams = ListApiFnParams
> = {
  apiFn: ListApiFn<TEntity, TParams>;
  action: EntityActionType.LIST;
  onSuccess?: (
    data: Awaited<ReturnType<ListQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type CreateApiFnParams<TEntity extends { id: string }> = [
  TEntity,
  ...args: any
];

export type CreateApiFn<
  TEntity extends { id: string },
  TParams extends CreateApiFnParams<TEntity> = CreateApiFnParams<TEntity>
> = (...args: TParams) => Promise<CreateResponse<TEntity>>;

export type CreateQueryHandler<
  TEntity extends { id: string },
  TParams extends CreateApiFnParams<TEntity> = CreateApiFnParams<TEntity>
> = {
  apiFn: CreateApiFn<TEntity, TParams>;
  action: EntityActionType.CREATE;
  onSuccess?: (
    data: Awaited<ReturnType<CreateQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type UpdateApiFnParams<TEntity extends { id: string }> = [
  string,
  TEntity,
  ...args: any
];

export type UpdateApiFn<
  TEntity extends { id: string },
  TParams extends UpdateApiFnParams<TEntity> = UpdateApiFnParams<TEntity>
> = (...args: TParams) => Promise<UpdateResponse<TEntity>>;

export type UpdateQueryHandler<
  TEntity extends { id: string },
  TParams extends UpdateApiFnParams<TEntity> = UpdateApiFnParams<TEntity>
> = {
  apiFn: UpdateApiFn<TEntity, TParams>;
  action: EntityActionType.UPDATE;
  onSuccess?: (
    data: Awaited<ReturnType<UpdateQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type ReadApiFnParams = [string, ...args: any];

export type ReadApiFn<
  TEntity extends { id: string },
  TParams extends ReadApiFnParams = ReadApiFnParams
> = (...args: TParams) => Promise<ReadResponse<TEntity>>;

export type ReadQueryHandler<
  TEntity extends { id: string },
  TParams extends ReadApiFnParams = ReadApiFnParams
> = {
  apiFn: ReadApiFn<TEntity, TParams>;
  action: EntityActionType.READ;
  onSuccess?: (
    data: Awaited<ReturnType<ReadQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type RemoveApiFnParams = [string, ...args: any];

export type RemoveApiFn<
  TEntity extends { id: string },
  TParams extends RemoveApiFnParams = RemoveApiFnParams
> = (...args: TParams) => Promise<RemoveResponse<TEntity>>;

export type RemoveQueryHandler<
  TEntity extends { id: string },
  TParams extends RemoveApiFnParams = RemoveApiFnParams
> = {
  apiFn: RemoveApiFn<TEntity, TParams>;
  action: EntityActionType.REMOVE;
  onSuccess?: (
    data: Awaited<ReturnType<RemoveQueryHandler<TEntity>['apiFn']>>
  ) => void;
  onError?: (error: unknown) => void;
};

export type CrudQueryHandlers<TEntity extends { id: string }> = {
  list: ListQueryHandler<TEntity>;
  create: CreateQueryHandler<TEntity>;
  update: UpdateQueryHandler<TEntity>;
  remove: RemoveQueryHandler<TEntity>;
  read: ReadQueryHandler<TEntity>;
};

export type ListResponse<TEntity extends { id: string }> = {
  data: Array<TEntity>;
  pagination?: Pagination;
};

export type CreateResponse<TEntity extends { id: string }> = {
  data: TEntity;
};

export type UpdateResponse<TEntity extends { id: string }> = {
  data: TEntity;
};

export type ReadResponse<TEntity extends { id: string }> = {
  data: TEntity;
};

export type RemoveResponse<TEntity extends { id: string }> = {
  data: TEntity;
};

export type QueryHandler<TEntity extends { id: string } = { id: string }> =
  | ListQueryHandler<TEntity>
  | CreateQueryHandler<TEntity>
  | UpdateQueryHandler<TEntity>
  | ReadQueryHandler<TEntity>
  | RemoveQueryHandler<TEntity>;

export type ExtractHandler<
  TEntity extends { id: string },
  T extends { [K in keyof T]: QueryHandler<TEntity> },
  TEntityActionType extends EntityActionType
> = Extract<T[StringKey<keyof T>], { action: TEntityActionType }>;

export type NormalizeEntity<T extends AnyObject> = {
  [K in keyof T]: T[K] extends Array<{ id?: string }>
    ? Array<string>
    : T[K] extends { id?: string }
    ? string
    : T[K];
};

export type ModelSchema = {
  foreignKeys?: Array<ForeignKey>;
  relationships?: Array<{ fieldName: string; entityName: string }>;
};

export type ApiFnParameters<
  TEntity extends { id: string },
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType
> = Parameters<Extract<TQueryHandler, { action: TEntityActionType }>['apiFn']>;

export type ExtractQueryHandlerApiFnParameters<
  TEntity extends { id: string },
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType
> = Parameters<Extract<TQueryHandler, { action: TEntityActionType }>['apiFn']>;

export type ExtractApiFnParametersArg1<
  TEntity extends { id: string },
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType,
  TApiFnParameters extends ApiFnParameters<
    TEntity,
    TQueryHandler,
    TEntityActionType
  >
> = TApiFnParameters extends [infer Arg1, ...infer _] ? Arg1 : never;

export type ExcludeApiFnParametersArg1<
  TEntity extends { id: string },
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
  TEntity extends { id: string },
  TQueryHandler extends QueryHandler<TEntity>,
  TEntityActionType extends EntityActionType
> = TEntityActionType extends EntityActionType.LIST
  ? [
      {
        queryKey: string;
        invalidateQuery?: InvalidateQueryStrategy;
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
