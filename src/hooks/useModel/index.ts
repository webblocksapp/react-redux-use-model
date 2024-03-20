import { EntityActionType, EntityHelperActionType } from '@constants';
import {
  EntityAction,
  Pagination,
  RootState,
  QueryState,
  StringKey,
  ForeignKey,
  AnyObject,
  PaginationParams,
  NormalizedState,
} from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import {
  calcPageSize,
  calcPage,
  paginateData,
  useModelContext,
  calcTotalPages,
  calcPaginationLimit,
  useQueryKey,
  isLastPage,
  isPageBlank,
} from '@utils';
import { useApiClients } from '@hooks';
import { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

type ListApiFnParams<
  T extends {
    [K in keyof T]: QueryHandler;
  }
> = Parameters<ExtractHandler<T, EntityActionType.LIST>['apiFn']>;

type ListResponse = {
  data: Array<{ id: string }>;
  pagination?: Pagination;
};

type CreateResponse = {
  data: { id: string };
};

type UpdateResponse = {
  data: { id: string };
};

type RemoveResponse = {
  data: { id?: string };
};

type QueryHandlers<T> = {
  [K in keyof T]: QueryHandler;
};

type QueryHandler =
  | {
      apiFn: (
        paginationParams: PaginationParams,
        ...args: any
      ) => Promise<ListResponse>;
      action: EntityActionType.LIST;
    }
  | {
      apiFn: (...args: any) => Promise<CreateResponse>;
      action: EntityActionType.CREATE;
    }
  | {
      apiFn: (id: string, entity: any, ...args: any) => Promise<UpdateResponse>;
      action: EntityActionType.UPDATE;
    }
  | {
      apiFn: (
        id: string,
        entity?: any,
        ...args: any
      ) => Promise<RemoveResponse>;
      action: EntityActionType.REMOVE;
    };

type ExtractEntity<T extends QueryHandlers<T>> = Awaited<
  ReturnType<ExtractHandler<T, EntityActionType.LIST>['apiFn']>
>['data'][0];

type ExtractHandler<
  T extends QueryHandlers<T>,
  TEntityActionType extends EntityActionType
> = Extract<T[StringKey<keyof T>], { action: TEntityActionType }>;

type NormalizeEntity<T extends AnyObject> = {
  [K in keyof T]: T[K] extends Array<{ id?: string }>
    ? Array<string>
    : T[K] extends { id?: string }
    ? string
    : T[K];
};

type ModelSchema = { foreignKeys: Array<ForeignKey> };

export const useModel = <T extends QueryHandlers<T>>(params: {
  handlers: T;
  entityName: string;
  schema?: ModelSchema;
  config?: {
    paginationSizeMultiplier?: number;
    initialLoadingSize?: number;
  };
}) => {
  const queryKey = useQueryKey();
  const ref = queryKey.ref || useRef({ queryKey: '' });
  const { handlers, entityName, schema, config } = params;
  const { paginationSizeMultiplier = 5, initialLoadingSize = 10 } =
    config || {};
  const { findQuery, findEntityState } = useModelContext();

  /**
   * Extract the apis from the handlers.
   */
  const apis = useMemo(() => {
    const apisFns = {} as {
      [K in keyof T]: T[K]['apiFn'];
    };
    const keys = Object.keys(handlers) as Array<keyof T>;
    for (const key of keys) {
      apisFns[key] = handlers[key]['apiFn'];
    }

    return apisFns;
  }, []);

  const { runApi, state } = useApiClients(apis);

  /**
   * Dispatch initialization.
   */
  const dispatch = useDispatch<Dispatch<EntityAction>>();

  /**
   * Get the query key from the ref.
   */
  const getQueryKey = () => ref.current.queryKey;

  /**
   * Set the query key from the ref.
   */
  const setQueryKey = (queryKey: string) => {
    ref.current.queryKey = queryKey;
  };

  /**
   * Dispatch a list of entities.
   */
  const dispatchList = (params: {
    entities: Array<any>;
    queryKey: string;
    pagination?: QueryState['pagination'];
    currentPage?: number;
    params: any;
    sizeMultiplier?: number;
  }) => {
    dispatch({
      type: EntityActionType.LIST,
      entityName,
      ...params,
    });
  };

  /**
   * Dispatch a created entity.
   */
  const dispatchCreate = (params: {
    entity: any;
    queryKey: string | undefined;
  }) => {
    dispatch({
      type: EntityActionType.CREATE,
      entityName,
      ...params,
    });
  };

  /**
   * Dispatch an updated entity.
   */
  const dispatchUpdate = (params: { entity: any }) => {
    dispatch({
      type: EntityActionType.UPDATE,
      entityName,
      ...params,
    });
  };

  /**
   * Dispatch remove operation.
   */
  const dispatchRemove = (params: { entityId: string }) => {
    dispatch({
      type: EntityActionType.REMOVE,
      entityName,
      foreignKeys: schema?.foreignKeys || [],
      ...params,
    });
  };

  /**
   * Initialize model methods.
   */
  const buildModelMethods = () => {
    const modelMethods = {} as {
      [K in keyof T]: (...params: Parameters<T[K]['apiFn']>) => Promise<void>;
    };
    const keys = Object.keys(handlers) as Array<keyof T>;

    for (const key of keys) {
      modelMethods[key] = buildModelMethod(
        key as StringKey<keyof T>,
        handlers[key]
      );
    }

    return modelMethods;
  };

  /**
   * Get the pagination from the cached params inside a query.
   */
  const getCachedPaginationParams = (queryKey: string) => {
    const query = findQuery(entityName, queryKey);
    let [cachedPaginationParams] = (query?.params || []) as ListApiFnParams<T>;
    return cachedPaginationParams;
  };

  /**
   * Get the current page from the query.
   */
  const getCurrentPage = (queryKey: string) => {
    const query = findQuery(entityName, queryKey);
    return query?.currentPage;
  };

  /**
   * Build the list method.
   */
  const buildListMethod = (handlerName: StringKey<keyof T>) => {
    return async (
      ...params: Parameters<ExtractHandler<T, EntityActionType.LIST>['apiFn']>
    ) => {
      const queryKey = getQueryKey();
      const [paginationParams, ...restParams] = params;
      let cachedPaginationParams = getCachedPaginationParams(queryKey);
      const page = paginationParams?._page || 0;
      const size =
        paginationParams?._size || cachedPaginationParams?._size || 10;
      const sizeMultiplier = paginationSizeMultiplier || 1;

      if (queryKey) {
        dispatchGoToPage({
          queryKey,
          page,
          size,
          sizeMultiplier,
        });
      }

      const response = (await runApi({
        apiName: handlerName,
        params: [
          {
            ...paginationParams,
            _page: calcPage({
              page,
              size,
              sizeMultiplier,
            }),
            _size: calcPageSize({
              size,
              sizeMultiplier,
            }),
          },
          ...restParams,
        ] as typeof params,
      })) as ListResponse;

      cachedPaginationParams = getCachedPaginationParams(queryKey);

      dispatchList({
        entities: response?.data || [],
        queryKey,
        pagination: response.pagination
          ? {
              ...response.pagination,
              page,
              size,
              totalPages: calcTotalPages({
                totalElements: response.pagination.totalElements,
                size,
              }),
            }
          : undefined,
        currentPage: getCurrentPage(queryKey),
        params,
        sizeMultiplier,
      });
    };
  };

  /**
   * Build the create method.
   */
  const buildCreateMethod = (handlerName: StringKey<keyof T>) => {
    return async (
      ...params: Parameters<ExtractHandler<T, EntityActionType.CREATE>['apiFn']>
    ) => {
      const queryKey = getQueryKey();
      const { data } = (await runApi({
        apiName: handlerName,
        params,
      })) as CreateResponse;

      dispatchCreate({ entity: data, queryKey });
    };
  };

  /**
   * Build the update method
   */
  const buildUpdateMethod = (handlerName: StringKey<keyof T>) => {
    return async (
      ...params: Parameters<ExtractHandler<T, EntityActionType.UPDATE>['apiFn']>
    ) => {
      const { data } = (await runApi({
        apiName: handlerName,
        params,
        throwError: true,
      })) as UpdateResponse;

      dispatchUpdate({ entity: data });
    };
  };

  /**
   * Build the remove method.
   */
  const buildRemoveMethod = (handlerName: StringKey<keyof T>) => {
    return async (
      ...params: Parameters<ExtractHandler<T, EntityActionType.REMOVE>['apiFn']>
    ) => {
      const [entityId] = params;
      const { data } = (await runApi({
        apiName: handlerName,
        params,
      })) as RemoveResponse;

      dispatchRemove({
        entityId: data?.id || entityId,
      });

      const entityState = findEntityState(entityName);
      const queries = entityState?.queries || [];

      for (let query of queries) {
        if (query.pagination && query.pagination.page == query.currentPage) {
          /**
           * Page is decreased in one on every query if it's detected that the
           * current page is the last page and if the current page is blank.
           */
          if (
            isLastPage(query.pagination) &&
            query.pagination.page == query.currentPage &&
            isPageBlank(query.pagination)
          ) {
            const queryKey = query.queryKey;
            const cachedPaginationParams = getCachedPaginationParams(queryKey);
            dispatchGoToPage({
              queryKey,
              page: query.currentPage - 1,
              size: cachedPaginationParams._size,
              sizeMultiplier: paginationSizeMultiplier,
            });
          }
        }
      }
    };
  };

  /**
   * Orchestrate the api function with the state dispatcher.
   */
  const buildModelMethod = (
    handlerName: StringKey<keyof T>,
    handler: QueryHandler
  ) => {
    switch (handler.action) {
      case EntityActionType.LIST:
        return buildListMethod(handlerName);
      case EntityActionType.CREATE:
        return buildCreateMethod(handlerName);
      case EntityActionType.UPDATE:
        return buildUpdateMethod(handlerName);
      case EntityActionType.REMOVE:
        return buildRemoveMethod(handlerName);
      default:
        return async () => {};
    }
  };
  /**
   * Handles cache pagination to specific page.
   */
  const dispatchGoToPage = (params: {
    queryKey: string;
    page: number;
    size: number;
    sizeMultiplier: number;
  }) => {
    dispatch({
      type: EntityHelperActionType.GO_TO_PAGE,
      entityName,
      ...params,
    });
  };

  /**
   * Selects normalized entity state by the entity name.
   */
  const selectNormalizedEntityState = (state: RootState) =>
    state.normalizedEntitiesState[entityName];

  /**
   * Select multiple entities values from the normalized list.
   */
  const selectEntities = createSelector(
    [
      selectNormalizedEntityState,
      (_: RootState, ids: Array<string> | null | undefined) => ids,
    ],
    (state, ids) => {
      const entities: Array<ReturnType<typeof buildSelectedEntity>> = [];

      if (ids) {
        for (const id of ids) {
          entities.push(buildSelectedEntity(state, id));
        }
      }

      return entities;
    }
  );

  /**
   * Util function for building the selected entity for entities selectors.
   */
  const buildSelectedEntity = (
    state: NormalizedState | undefined,
    entityId?: string
  ) => {
    entityId = entityId || emptyId();
    const loading = state?.byId?.[entityId] === undefined;
    const entity = (entityId ? state?.byId?.[entityId] : undefined) as
      | NormalizeEntity<ExtractEntity<T>>
      | undefined;
    return { id: entityId, data: entity, loading };
  };

  /**
   * Select an entity value from the normalized list.
   */
  const selectEntity = createSelector(
    [selectNormalizedEntityState, (_: RootState, id?: string) => id],
    (state, id) => buildSelectedEntity(state, id)
  );

  /**
   * All queries selector from an entity state.
   */
  const selectQueries = createSelector(
    [selectNormalizedEntityState],
    (state) => state?.queries
  );

  /**
   * Helper function that generates a random empty id.
   */
  const emptyId = () => `empty-${uuid()}`;

  /**
   * Helper function that generates random empty ids.
   */
  const buildEmptyIds = (size: number) => {
    return Array(size)
      .fill(null)
      .map(() => emptyId());
  };

  /**
   * Select the query.
   */
  const selectQuery = createSelector([selectQueries], (queries) => {
    const queryKey = getQueryKey();
    const query = queries?.find((item) => item.queryKey == queryKey);
    return {
      ...query,
      ids: query?.ids?.map((item) => {
        if (item === null || item === undefined) return emptyId();
        return item;
      }),
    } as QueryState<
      Parameters<ExtractHandler<T, EntityActionType.LIST>['apiFn']>
    >;
  });

  /**
   * Select pagination params
   */
  const selectPaginationParams = createSelector([selectQuery], (query) => {
    const paginationParams = query?.params?.[0];
    return {
      ...paginationParams,
      _size: paginationParams?._size || 10,
      _page: paginationParams?._page || 0,
    };
  });

  /**
   * Select the paginated query.
   */
  const selectPaginatedQuery = createSelector([selectQuery], (query) => {
    if (query?.pagination) {
      const { size, totalElements, page } = query.pagination;
      let { content: ids } = paginateData(query?.ids || [], {
        page,
        limit: size,
      });

      const limit = calcPaginationLimit({
        page: query.currentPage || 0,
        size,
        totalElements,
      });

      if (limit !== size) {
        ids = Array(limit)
          .fill(null)
          .map((_, i) => ids[i]);
      }

      return { ...query, ids };
    }

    return { ...query, ids: buildEmptyIds(initialLoadingSize) };
  });

  return {
    ...buildModelMethods(),
    ...state,
    setQueryKey,
    selectEntity,
    selectEntities,
    selectPaginatedQuery,
    selectQuery,
    selectPaginationParams,
  };
};
