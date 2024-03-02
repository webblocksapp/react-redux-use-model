import { RootState, StateQuery } from '@interfaces';
import { createSelector } from '@reduxjs/toolkit';

export const useQueryHandler = <TQueryData>(options: {
  componentId: string | undefined;
  stateSelector: (state: RootState) => {
    queries: Array<StateQuery<TQueryData>>;
  };
}) => {
  const selectQueries = createSelector(
    [options.stateSelector],
    (state) => state.queries
  );
  const selectQuery = createSelector([selectQueries], (queries) =>
    queries.find((item) => item.componentId == options.componentId)
  );

  return { selectQuery };
};
