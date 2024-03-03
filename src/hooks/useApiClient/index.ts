import { ApiClientFn, Pagination } from '@interfaces';
import { useState } from 'react';

export const useApiClient = <T extends ApiClientFn>(apiClientFn: T) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [response, setResponse] = useState<{
    data: Awaited<ReturnType<T>>['data'];
    pagination?: Pagination;
  }>();

  const run = async (params?: Parameters<T>[0]) => {
    try {
      setLoading(true);
      const response = await apiClientFn(params);
      setResponse(response);
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, run, error, ...response };
};
