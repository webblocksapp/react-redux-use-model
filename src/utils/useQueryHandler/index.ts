import { NormalizedState, RootState } from '@interfaces';
import { createSelector } from '@reduxjs/toolkit';

export const useQueryHandler = <TEntity, TQueryData>(options: {
  componentId: string | undefined;
  stateSelector: (state: RootState) => NormalizedState<TEntity, TQueryData>;
}) => {
  const selectEntity = createSelector(
    [
      options.stateSelector,
      (_: RootState, id: string | null | undefined) => id,
    ],
    (state, id) => {
      const entity = id ? state.byId[id] : undefined;
      return { entity, loading: entity ? false : true };
    }
  );
  const selectQueries = createSelector(
    [options.stateSelector],
    (state) => state.queries
  );
  const selectQuery = createSelector([selectQueries], (queries) => {
    return queries.find((item) => item.componentId == options.componentId);
  });

  return { selectQuery, selectEntity };
};
