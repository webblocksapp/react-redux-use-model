import { NormalizedEntitiesState, QueryState } from '@interfaces';
import { createContext, useContext } from 'react';

export type ModelContextType = {
  getNormalizedEntitiesState: () => NormalizedEntitiesState;
  findQuery: (entityName: string, queryKey: string) => QueryState | undefined;
  findEntity: <TEntity extends { id?: string }>(
    entityName: string,
    entityId: string
  ) => TEntity | undefined;
};

export const ModelContext = createContext<ModelContextType>({} as any);
export const useModelContext = () => useContext(ModelContext);
