import { createContext, useContext } from 'react';

export type QueryKeyContextType = {
  ref:
    | React.MutableRefObject<{
        queryKey: string;
      }>
    | undefined;
};
export const QueryKeyContext = createContext<QueryKeyContextType>({
  ref: undefined,
});
export const useQueryKey = () => useContext(QueryKeyContext);
