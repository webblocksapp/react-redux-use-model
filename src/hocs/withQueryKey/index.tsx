import { QueryKeyContext, QueryKeyContextType } from '@utils';
import { useRef } from 'react';

export const withQueryKey = <T extends JSX.IntrinsicAttributes>(
  Component: React.FC<T>
) => {
  return (props: T) => {
    const ref: QueryKeyContextType['ref'] = useRef<{
      queryKey: string;
    }>({
      queryKey: '',
    });

    return (
      <QueryKeyContext.Provider value={{ ref }}>
        <Component {...props} />
      </QueryKeyContext.Provider>
    );
  };
};
