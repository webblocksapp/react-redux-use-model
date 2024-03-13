import { NormalizedEntitiesState } from '@interfaces';
import { Store } from '@reduxjs/toolkit';
import { createContext, useContext } from 'react';

export interface ModelProviderProps {
  store: Store<{ normalizedEntitiesState: NormalizedEntitiesState }>;
  children?: React.ReactNode;
}

export type ModelContextType = {
  getNormalizedEntitiesState: () => NormalizedEntitiesState;
};

export const ModelContext = createContext<ModelContextType | null>(null);
export const useModelContext = () => useContext(ModelContext);

export const ModelProvider: React.FC<ModelProviderProps> = ({
  store,
  children,
}) => {
  const getNormalizedEntitiesState: ModelContextType['getNormalizedEntitiesState'] =
    () => {
      return store.getState().normalizedEntitiesState;
    };

  return (
    <ModelContext.Provider value={{ getNormalizedEntitiesState }}>
      {children}
    </ModelContext.Provider>
  );
};
