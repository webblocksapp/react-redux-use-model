import { RootState, StateQuery } from '@interfaces';
import { createSelector } from '@reduxjs/toolkit';

export const useQuerySelector = (
  queriesSelector: (state: any) => Array<StateQuery>
) => {
  const selectQuery = createSelector(
    [
      queriesSelector,
      (_: RootState, componentName: string) => componentName,
      (_: RootState, componentName: string, componentId?: string) => {
        componentName;
        return componentId;
      },
    ],
    (queries, componentName, componentId) => {
      if (componentId)
        return queries.find(
          (item) =>
            item.componentName == componentName &&
            item.componentId == componentId
        );
      return queries.find((item) => item.componentName == componentName);
    }
  );

  return { selectQuery };
};
