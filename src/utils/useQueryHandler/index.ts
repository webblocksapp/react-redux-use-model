import { NormalizedState, RootState } from '@interfaces';
import { createSelector } from '@reduxjs/toolkit';

export const useQueryHandler = <TEntity, TQueryData>(options: {
  componentId: string | undefined;
  stateSelector: (state: RootState) => NormalizedState<TEntity, TQueryData>;
}) => {
  const selectEntity = createSelector(
    [options.stateSelector, (_: RootState, id: string) => id],
    (state, id) => state.byId[id]
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
