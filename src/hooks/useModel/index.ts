import { EntityActionType } from '@constants';
import { EntityAction, Pagination, RootState, StringKey } from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { paginateData } from '@utils';
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

type QueryHandler<T = any> =
  | {
      apiFn: (...args: any) => Promise<ListResponse>;
      action: EntityActionType.LIST;
    }
  | {
      apiFn: (...args: any) => Promise<CreateResponse>;
      action: EntityActionType.CREATE;
      refetchHandler: StringKey<keyof T>;
    };

export const useModel = <
  T extends {
    [K in keyof T]: QueryHandler<T>;
  }
>(params: {
  handlers: T;
  entityName: string;
  queryKey: string | undefined;
}) => {
  const { handlers, entityName, queryKey } = params;

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
    queryData?: any;
    entityName?: string;
    currentPage?: number;
  }) => {
    dispatch({
      type: EntityActionType.LIST,
      queryKey,
      entityName,
      ...params,
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

      const response = (await runApi(handlerName, ...params)) as ListResponse;
      let queryData = { pagination: response?.pagination };

      dispatchList({
        entities: response?.data || [],
        queryData,
        currentPage: ref.current.currentPage,
      });
    };
  };

  /**
   * Build the create method.
   */
  const buildCreateMethod = (
    handlerName: StringKey<keyof T>,
    handler: Extract<QueryHandler, { action: EntityActionType.CREATE }>
  ) => {
    return async (...params: Parameters<QueryHandler['apiFn']>) => {
      await runApi(handlerName, ...params);
      const response = (await runApi(
        handler.refetchHandler as StringKey<keyof T>,
        ...params
      )) as ListResponse;
      let queryData = { pagination: response?.pagination };

      dispatchList({
        entities: response?.data || [],
        queryData,
        currentPage: ref.current.currentPage,
      });
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
        return buildCreateMethod(handlerName, handler);
      default:
        return async () => {};
    }
  };
  /**
   * Handles cache pagination to specific page.
   */
  const dispatchGoToPage = (params: { queryKey: string; page: number }) => {
    dispatch({ type: EntityActionType.GO_TO_PAGE, entityName, ...params });
  };

  /**
   * Selects normalized entity state by the entity name.
   */
  const selectNormalizedEntityState = (state: RootState) =>
    state.normalizedEntitiesState[entityName];

  /**
   * Select an entity value from the normalized list.
   */
  const selectEntity = createSelector(
    [
      selectNormalizedEntityState,
      (_: RootState, id: string | null | undefined) => id,
    ],
    (state, id) => {
      const entity = id ? state?.byId?.[id] : undefined;
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
    if (query.queryData?.pagination) {
      const { content } = paginateData(query.ids || [], {
        page: query.queryData?.pagination.page,
        limit: query.queryData?.pagination.size,
      });

      return { ...query, ids: content };
    }
  });

  return {
    ...buildModelMethods(),
    ...state,
    selectEntity,
    selectPaginatedQuery,
    selectQuery,
  };
};
