import { NormalizedEntitiesState } from '@interfaces';
import { Store } from '@reduxjs/toolkit';
import { ModelContext, ModelContextType } from '@utils';

export interface ModelProviderProps {
  store: Store<{ normalizedEntitiesState: NormalizedEntitiesState }>;
  children?: React.ReactNode;
}

export const ModelProvider: React.FC<ModelProviderProps> = ({
  store,
  children,
}) => {
  const getNormalizedEntitiesState: ModelContextType['getNormalizedEntitiesState'] =
    () => {
      return store.getState().normalizedEntitiesState;
    };

  const findQuery: ModelContextType['findQuery'] = (entityName, queryKey) => {
    const state = getNormalizedEntitiesState();
    return state[entityName]?.queries?.find(
      (item) => item.queryKey == queryKey
    );
  };

  const findEntity: ModelContextType['findEntity'] = (entityName, entityId) => {
    const state = getNormalizedEntitiesState();
    return state[entityName]?.byId?.[entityId];
  };

  return (
    <ModelContext.Provider
      value={{ getNormalizedEntitiesState, findQuery, findEntity }}
    >
      {children}
    </ModelContext.Provider>
  );
};
