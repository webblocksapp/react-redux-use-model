import { StringKey } from '@interfaces';
import { useMemo, useState } from 'react';

type Extend<T> = { [K in keyof T]: (...params: Array<any>) => Promise<any> };
type ApiClientState<T extends Extend<T>> = {
  isLoading: boolean;
  error?: unknown;
  response?: ReturnType<T[keyof T]>;
};
type ApiClientStates<T extends Extend<T>> = {
  [K in keyof T as `${StringKey<K>}State`]: ApiClientState<T>;
};

export const useApiClients = <T extends Extend<T>>(apis: T) => {
  const initialState = useMemo(() => {
    let result: { [key: string]: ApiClientState<T> } = {};
    Object.keys(apis).forEach((key) => {
      result[`${key}State`] = { isLoading: false, error: undefined };
    });
    return result;
  }, []);

  const [state, setState] = useState<{ [key: string]: ApiClientState<T> }>(
    initialState
  );

  const updateState = <K extends keyof T>(
    apiName: StringKey<K>,
    state: Partial<ApiClientState<T>>
  ) => {
    const apiStateName = `${apiName}State`;
    setState((prev) => ({
      ...prev,
      [apiStateName]: { ...prev[apiStateName], ...state },
    }));
  };

  const runApi = async <K extends keyof T>(
    apiName: Extract<K, string>,
    ...params: Parameters<T[K]>
  ) => {
    try {
      updateState(apiName, { isLoading: true });
      const response = await apis[apiName](...params);
      updateState(apiName, { response });
      return response;
    } catch (error) {
      updateState(apiName, { error });
    } finally {
      updateState(apiName, { isLoading: false });
    }
  };

  return {
    state: state as ApiClientStates<T>,
    runApi,
  };
};
