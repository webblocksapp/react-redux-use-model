import { createContext, useContext } from 'react';

export type MswContextType = {
  loading: boolean;
  hasError: boolean;
};

export const MswContext = createContext<MswContextType | undefined>(undefined);
export const useMswContext = () => useContext(MswContext);
