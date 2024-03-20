/**
 * This function can be used to limit the frequency of function calls,
 * ensuring that the function is only called after a certain amount of
 * time has passed since the last time it was called.
 */
export const debounce = <T extends (...args: any[]) => void>(fn: T, wait = 200) => {
  let timerId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};
