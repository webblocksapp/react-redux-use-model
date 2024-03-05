import { EntityActionType } from '@constants';
import { EntityAction, Pagination, RootState } from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { paginateData } from '@utils';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

type QueryHandler =
  | {
      apiFn: (...args: any) => Promise<{
        data: Array<{ id: string }>;
        pagination?: Pagination;
      }>;
      action: EntityActionType.LIST;
    }
  | {
      apiFn: (...args: any) => Promise<{
        data: { id: string };
      }>;
      action: EntityActionType.CREATE;
    };

export const useQueryHandler = <
  T extends {
    [K in keyof T]: QueryHandler;
  }
>(params: {
  handlers: T;
  entityName: string;
  queryKey: string | undefined;
}) => {
  const { handlers, entityName, queryKey } = params;
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
      modelMethods[key] = buildModelMethod(handlers[key]);
    }

    return modelMethods;
  };

  /**
   * Orchestrate the api function with the state dispatcher.
   */
  const buildModelMethod = (handler: QueryHandler) => {
    switch (handler.action) {
      case EntityActionType.LIST:
        return async (...params: Parameters<QueryHandler['apiFn']>) => {
          const page = getPageFromParams(params);

          if (queryKey) {
            ref.current.currentPage = page || 0;
            dispatchGoToPage({
              queryKey,
              page: ref.current.currentPage,
            });
          }

          const response = await handler.apiFn(...params);
          let queryData = { pagination: response?.pagination };

          dispatchList({
            entities: response?.data || [],
            queryData,
            currentPage: ref.current.currentPage,
          });
        };
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
    selectEntity,
    selectPaginatedQuery,
    selectQuery,
  };
};
