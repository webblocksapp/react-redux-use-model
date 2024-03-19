import {
  Entity,
  NormalizedEntitiesState,
  QueryState,
  RootState,
} from '@interfaces';
import { createContext, useContext } from 'react';

export type ModelContextType = {
  getRootState: () => RootState;
  getNormalizedEntitiesState: () => NormalizedEntitiesState;
  findEntityState: (entityName: string) => NormalizedEntitiesState[string];
  findQuery: (
    entityName: string,
    queryKey: string | undefined
  ) => QueryState | undefined;
  findEntity: (entityName: string, entityId: string) => Entity | undefined;
};

export const ModelContext = createContext<ModelContextType>({} as any);
export const useModelContext = () => useContext(ModelContext);
