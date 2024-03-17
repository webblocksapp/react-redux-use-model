import { EntityActionType, EntityHelperActionType } from '@constants';
import {
  EntityAction,
  Pagination,
  RootState,
  QueryState,
  StringKey,
  ForeignKey,
  AnyObject,
} from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { now, paginateData, useModelContext } from '@utils';
import { useApiClients } from '@hooks';
import { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

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
  data: { id: string };
};

type QueryHandler =
  | {
      apiFn: (...args: any) => Promise<ListResponse>;
      action: EntityActionType.LIST;
    }
  | {
      apiFn: (...args: any) => Promise<CreateResponse>;
      action: EntityActionType.CREATE;
    }
  | {
      apiFn: (id: string, entity: any, ...args: any) => Promise<UpdateResponse>;
      action: EntityActionType.UPDATE;
      optimistic?: boolean;
    }
  | {
      apiFn: (
        id: string,
        entity?: any,
        ...args: any
      ) => Promise<RemoveResponse>;
      action: EntityActionType.REMOVE;
    };

type ExtractEntity<
  T extends {
    [K in keyof T]: QueryHandler;
  }
> = Awaited<
  ReturnType<
    Extract<T[StringKey<keyof T>], { action: EntityActionType.LIST }>['apiFn']
  >
>['data'][0];

type NormalizeEntity<T extends AnyObject> = {
  [K in keyof T]: T[K] extends Array<{ id?: string }>
    ? Array<string>
    : T[K] extends { id?: string }
    ? string
    : T[K];
};

type ModelSchema = { foreignKeys: Array<ForeignKey> };

export const useModel = <
  T extends {
    [K in keyof T]: QueryHandler;
  }
>(params: {
  handlers: T;
  entityName: string;
  queryKey: string | undefined;
  schema?: ModelSchema;
}) => {
  const { handlers, entityName, queryKey, schema } = params;
  const { findEntity, findQuery, findEntityState } = useModelContext();

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
  const ref = useRef<{ currentPage: number }>({
    currentPage: 0,
  });

  /**
   * Dispatch initialization.
   */
  const dispatch = useDispatch<Dispatch<EntityAction>>();

  /**
   * Dispatch a list of entities.
   */
  const dispatchList = (params: {
    entities: Array<any>;
    pagination?: QueryState['pagination'];
    currentPage?: number;
    params: any;
  }) => {
    dispatch({
      type: EntityActionType.LIST,
      queryKey,
      entityName,
      ...params,
    });
  };

  /**
   * Dispatch a created entity.
   */
  const dispatchCreate = (params: { entity: any }) => {
    dispatch({
      type: EntityActionType.CREATE,
      entityName,
      ...params,
    });
  };

  /**
   * Dispatch an updated entity.
   */
  const dispatchUpdate = (params: {
    entity: any;
    optimisticUpdateTimestamp?: number;
  }) => {
    dispatch({
      type: EntityActionType.UPDATE,
      entityName,
      ...(params?.optimisticUpdateTimestamp
        ? { optimisticUpdateTimestamp: params.optimisticUpdateTimestamp }
        : {}),
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
   * Dispatch entity timestamps.
   */
  const dispatchTimestamps = (timestamps: {
    optimisticUpdate?: number;
    optimisticRemove?: number;
  }) => {
    dispatch({
      type: EntityHelperActionType.UPDATE_TIMESTAMPS,
      entityName,
      timestamps,
    });
  };

  /**
   * Get page from params.
   */
  const getPageFromParams = (params: Array<any>) => {
    const param = params.find(
      (item) => item?.page !== undefined || item?._page !== undefined
    );

    return param?.page || param?._page;
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
   * Get the list query handler name.
   */
  const getRefetchHandlerName = () => {
    for (const [key, value] of Object.entries(handlers)) {
      if ((value as QueryHandler).action === EntityActionType.LIST) return key;
    }
  };

  /**
   * Build the list method.
   */
  const buildListMethod = (handlerName: StringKey<keyof T>) => {
    return async (...params: Parameters<QueryHandler['apiFn']>) => {
      const page = getPageFromParams(params);

      if (queryKey) {
        ref.current.currentPage = page || 0;
        dispatchGoToPage({
          queryKey,
          page: ref.current.currentPage,
        });
      }

      const response = (await runApi({
        apiName: handlerName,
        params,
      })) as ListResponse;

      dispatchList({
        entities: response?.data || [],
        pagination: response?.pagination,
        currentPage: ref.current.currentPage,
        params,
      });
    };
  };

  /**
   * Build the create method.
   */
  const buildCreateMethod = (handlerName: StringKey<keyof T>) => {
    return async (...params: Parameters<QueryHandler['apiFn']>) => {
      const { data } = (await runApi({
        apiName: handlerName,
        params,
      })) as CreateResponse;
      dispatchCreate({ entity: data });
      const refetchHandlerName = getRefetchHandlerName();

      if (refetchHandlerName === undefined) return;
      if (queryKey === undefined) return;

      const query = findQuery(entityName, queryKey);
      const response = (await runApi({
        apiName: refetchHandlerName as StringKey<keyof T>,
        params: query?.params,
      })) as ListResponse;

      dispatchList({
        entities: response?.data || [],
        pagination: response.pagination,
        currentPage: ref.current.currentPage,
        params: query?.params,
      });
    };
  };

  /**
   * Build the update method
   */
  const buildUpdateMethod = (
    handlerName: StringKey<keyof T>,
    handler: Extract<QueryHandler, { action: EntityActionType.UPDATE }>
  ) => {
    return async (...params: Parameters<QueryHandler['apiFn']>) => {
      const [entityId, updatedEntity] = params as Parameters<
        (typeof handler)['apiFn']
      >;
      const currentEntity = findEntity(entityName, entityId);
      const timestamp = now();

      // Update in memory is done prev api call.
      if (handler.optimistic) {
        dispatchUpdate({
          entity: updatedEntity,
          optimisticUpdateTimestamp: timestamp,
        });
      }

      dispatchTimestamps({ optimisticUpdate: timestamp });

      try {
        const { data } = (await runApi({
          apiName: handlerName,
          params,
          throwError: true,
        })) as UpdateResponse;

        /**
         * Response dispatch is cancelled if an optimistic update
         * is sent multiple times. (Last update wins)
         */
        const nextTimestamp =
          findEntityState(entityName)?.timestamps?.optimisticUpdate;

        if (nextTimestamp && nextTimestamp !== timestamp) {
          return;
        }

        dispatchUpdate({ entity: data });
      } catch (_) {
        dispatchUpdate({ entity: currentEntity }); // Entity is rollback in case of api fail
      }

      const refetchHandlerName = getRefetchHandlerName();

      if (refetchHandlerName === undefined) return;
      if (queryKey === undefined) return;

      const query = findQuery(entityName, queryKey);
      const response = (await runApi({
        apiName: refetchHandlerName as StringKey<keyof T>,
        params: query?.params,
      })) as ListResponse;

      dispatchList({
        entities: response?.data || [],
        pagination: response.pagination,
        currentPage: ref.current.currentPage,
        params: query?.params,
      });
    };
  };

  /**
   * Build the remove method.
   */
  const buildRemoveMethod = (handlerName: StringKey<keyof T>) => {
    return async (...params: Parameters<QueryHandler['apiFn']>) => {
      const { data } = (await runApi({
        apiName: handlerName,
        params,
      })) as RemoveResponse;

      dispatchRemove({ entityId: data.id });
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
        return buildUpdateMethod(handlerName, handler);
      case EntityActionType.REMOVE:
        return buildRemoveMethod(handlerName);
      default:
        return async () => {};
    }
  };
  /**
   * Handles cache pagination to specific page.
   */
  const dispatchGoToPage = (params: { queryKey: string; page: number }) => {
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
      const entities: Array<{
        entity: NormalizeEntity<ExtractEntity<T>> | undefined;
        loading: boolean;
      }> = [];
      if (ids) {
        for (const id of ids) {
          const entity = (id ? state?.byId?.[id] : undefined) as
            | NormalizeEntity<ExtractEntity<T>>
            | undefined;
          entities.push({ entity, loading: entity ? false : true });
        }
      }
      return entities;
    }
  );

  /**
   * Select an entity value from the normalized list.
   */
  const selectEntity = createSelector(
    [
      selectNormalizedEntityState,
      (_: RootState, id: string | null | undefined) => id,
    ],
    (state, id) => {
      const entity = (id ? state?.byId?.[id] : undefined) as
        | NormalizeEntity<ExtractEntity<T>>
        | undefined;
      return { entity, loading: entity ? false : true };
    }
  );

  /**
   * All queries selector from an entity state.
   */
  const selectQueries = createSelector(
    [selectNormalizedEntityState],
    (state) => state?.queries
  );

  /**
   * Select the query.
   */
  const selectQuery = createSelector([selectQueries], (queries) => {
    const query = queries?.find((item) => item.queryKey == queryKey);
    return {
      ...query,
      ids: query?.ids?.map((item) => {
        if (item === null || item === undefined) return `empty-${uuid()}`;
        return item;
      }),
    };
  });

  /**
   * Select the paginated query.
   */
  const selectPaginatedQuery = createSelector([selectQuery], (query) => {
    if (query?.pagination) {
      const { content } = paginateData(query.ids || [], {
        page: query?.pagination.page,
        limit: query?.pagination.size,
      });

      return { ...query, ids: content };
    }
  });

  return {
    ...buildModelMethods(),
    ...state,
    selectEntity,
    selectEntities,
    selectPaginatedQuery,
    selectQuery,
  };
};
