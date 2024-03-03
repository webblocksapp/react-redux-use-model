import { EntityActionType } from '@constants';
import { EntityAction, RootState } from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

export const useQueryHandler = <
  TNormalizedEntity extends { id: string },
  TQueryData
>(options: {
  entityName: string;
  queryKey: string | undefined;
}) => {
  const { entityName, queryKey: defaultQueryKey } = options;

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
    queryKey: string | undefined;
    queryData?: TQueryData;
    entityName?: string;
  }) => {
    dispatch({ type: EntityActionType.LIST, entityName, ...params });
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

  return { selectQuery, selectEntity, dispatchList };
};
