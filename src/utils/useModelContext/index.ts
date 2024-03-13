import { NormalizedEntitiesState, StateQuery } from '@interfaces';
import { createContext, useContext } from 'react';

export type ModelContextType = {
  getNormalizedEntitiesState: () => NormalizedEntitiesState;
  findQuery: (entityName: string, queryKey: string) => StateQuery | undefined;
};

export const ModelContext = createContext<ModelContextType>({} as any);
export const useModelContext = () => useContext(ModelContext);
