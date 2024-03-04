import { EntityActionType } from '@constants';
import { useApiClient } from '@hooks';
import {
  EntityAction,
  Pagination,
  QueryHandlerOptions,
  RootState,
} from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { paginateData } from '@utils';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

export const useQueryHandler = <
  TNormalizedEntity extends { id: string },
  TQueryData extends { pagination?: Pagination }
>(
  options: QueryHandlerOptions<TNormalizedEntity>
) => {
  const {
    entityName,
    queryKey: defaultQueryKey,
    apiClientFn,
    action,
  } = options;
  const apiClient = useApiClient(apiClientFn);
  const ref = useRef<{ currentPage: number }>({
    currentPage: 0,
  });

  /**
   * Dispatch initialization.
   */
  const dispatch =
    useDispatch<Dispatch<EntityAction<TNormalizedEntity, TQueryData>>>();

  /**
   * Dispatch a list of entities.
   */
  const dispatchList = (params: {
    entities: Array<TNormalizedEntity>;
    queryData?: TQueryData;
    entityName?: string;
    currentPage?: number;
  }) => {
    dispatch({
      type: EntityActionType.LIST,
      queryKey: options.queryKey,
      entityName,
      ...params,
    });
  };

  const runApiClient = async (
    params?: Parameters<
      QueryHandlerOptions<TNormalizedEntity>['apiClientFn']
    >[0]
  ) => {
    switch (action) {
      case EntityActionType.LIST:
        if (defaultQueryKey) {
          ref.current.currentPage = params?._page || 0;
          dispatchGoToPage({
            queryKey: defaultQueryKey,
            page: ref.current.currentPage,
          });
        }

        const response = await apiClient.run(params);
        let queryData = { pagination: response?.pagination } as
          | TQueryData
          | undefined;

        dispatchList({
          entities: response?.data || [],
          queryData,
          currentPage: ref.current.currentPage,
        });
        break;
      default:
        break;
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
   * Select the query by the given query key to the query handler.
   */
  const selectQuery = createSelector(
    [selectQueries, (_: RootState, queryKey?: string) => queryKey],
    (queries, queryKey) => {
      const query = queries?.find(
        (item) => item.queryKey == (queryKey || defaultQueryKey)
      );
      return {
        ...query,
        ids: query?.ids?.map((item) => {
          if (item === null || item === undefined) return `empty-${uuid()}`;
          return item;
        }),
      };
    }
  );

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
    selectQuery,
    selectPaginatedQuery,
    selectEntity,
    runApiClient,
  };
};
