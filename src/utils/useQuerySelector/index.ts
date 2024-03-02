import { RootState, StateQuery } from '@interfaces';
import { createSelector } from '@reduxjs/toolkit';

export const useQuerySelector = (
  queriesSelector: (state: any) => Array<StateQuery>
) => {
  const selectQuery = createSelector(
    [queriesSelector, (_: RootState, componentId: string) => componentId],
    (queries, componentId) =>
      queries.find((item) => item.componentId == componentId)
  );

  return { selectQuery };
};
