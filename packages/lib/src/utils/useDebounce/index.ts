import { debounce } from '@utils';
import { useCallback } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  wait = 200
) => {
  return useCallback(debounce(fn), [wait]);
};
