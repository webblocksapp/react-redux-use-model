import { EntityActionType } from '@constants';
import { EntityAction, RootState } from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

export const useQueryHandler = <
  TEntity extends { id: string },
  TQueryData
>(options: {
  entityName: string;
  queryKey: string | undefined;
}) => {
  const dispatch = useDispatch<Dispatch<EntityAction<TEntity, TQueryData>>>();
  const dispatchList = (params: {
    entities: Array<TEntity>;
    queryKey: string | undefined;
    queryData?: TQueryData;
  }) => {
    dispatch({ type: EntityActionType.LIST, entityName, ...params });
  };

  const { entityName, queryKey } = options;
  const selectNormalizedEntityState = (state: RootState) => {
    const entityState = state.normalizedEntitiesState[entityName];
    return entityState ? entityState : undefined;
  };
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
  const selectQueries = createSelector(
    [selectNormalizedEntityState],
    (state) => state?.queries
  );
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

  return { selectQuery, selectEntity, dispatchList };
};
