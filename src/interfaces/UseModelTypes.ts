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

export type ListQueryHandler<TEntity extends { id: string }> = Extract<
  QueryHandler<TEntity>,
  { action: EntityActionType.LIST }
>;

export type CreateQueryHandler<TEntity extends { id: string }> = Extract<
  QueryHandler<TEntity>,
  { action: EntityActionType.CREATE }
>;

export type UpdateQueryHandler<TEntity extends { id: string }> = Extract<
  QueryHandler<TEntity>,
  { action: EntityActionType.UPDATE }
>;

export type RemoveQueryHandler<TEntity extends { id: string }> = Extract<
  QueryHandler<TEntity>,
  { action: EntityActionType.REMOVE }
>;

export type CrudQueryHandlers<TEntity extends { id: string }> = {
  list: ListQueryHandler<TEntity>;
  create: CreateQueryHandler<TEntity>;
  update: UpdateQueryHandler<TEntity>;
  remove: RemoveQueryHandler<TEntity>;
};

export type ListApiFnParams<
  TEntity extends { id: string },
  T extends { [K in keyof T]: QueryHandler<TEntity> }
> = Parameters<ExtractHandler<TEntity, T, EntityActionType.LIST>['apiFn']>;

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

export type RemoveResponse<TEntity extends { id: string }> = {
  data: TEntity;
};

export type QueryHandler<TEntity extends { id: string } = { id: string }> =
  | {
      apiFn: (
        paginationParams: PaginationParams,
        ...args: any
      ) => Promise<ListResponse<TEntity>>;
      action: EntityActionType.LIST;
      onSuccess?: (
        data: Awaited<ReturnType<ListQueryHandler<TEntity>['apiFn']>>
      ) => void;
      onError?: (error: unknown) => void;
    }
  | {
      apiFn: (
        entity: TEntity,
        ...args: any
      ) => Promise<CreateResponse<TEntity>>;
      action: EntityActionType.CREATE;
      onSuccess?: (
        data: Awaited<ReturnType<CreateQueryHandler<TEntity>['apiFn']>>
      ) => void;
      onError?: (error: unknown) => void;
    }
  | {
      apiFn: (
        id: string,
        entity: TEntity,
        ...args: any
      ) => Promise<UpdateResponse<TEntity>>;
      action: EntityActionType.UPDATE;
      onSuccess?: (
        data: Awaited<ReturnType<UpdateQueryHandler<TEntity>['apiFn']>>
      ) => void;
      onError?: (error: unknown) => void;
    }
  | {
      apiFn: (id: string, ...args: any) => Promise<RemoveResponse<TEntity>>;
      action: EntityActionType.REMOVE;
      onSuccess?: (
        data: Awaited<ReturnType<RemoveQueryHandler<TEntity>['apiFn']>>
      ) => void;
      onError?: (error: unknown) => void;
    };

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

export type ModelSchema = { foreignKeys: Array<ForeignKey> };

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
