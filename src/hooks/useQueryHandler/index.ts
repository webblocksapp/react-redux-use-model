import { EntityActionType } from '@constants';
import { useApiClient } from '@hooks';
import {
  EntityAction,
  Pagination,
  QueryHandlerOptions,
  RootState,
} from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
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
        if (params?._page && defaultQueryKey) {
          dispatchGoToPage({ queryKey: defaultQueryKey, page: params?._page });
        }

        const response = await apiClient.run(params);
        dispatchList({
          entities: response?.data || [],
          queryData: { pagination: response?.pagination } as TQueryData,
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
        (item) => item.queryKey == queryKey || defaultQueryKey
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

  return {
    selectQuery,
    selectEntity,
    runApiClient,
  };
};
