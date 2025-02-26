export const removeArrayDuplicates = <
  T extends Array<{ id?: string | number } | string | number | undefined>
>(
  arr: T,
  options?: {
    startIndex?: number;
    endIndex?: number;
    keepEmptyPositions?: boolean;
    size?: number;
  }
): T => {
  const lastIndex = arr.length;
  const { startIndex = 0, endIndex = lastIndex, size = 0 } = options || {};
  const seen = new Set<string | number>();
  const startArray = arr.slice(0, startIndex) as T;
  const endArray = arr.slice(endIndex + size, lastIndex) as T;
  const slicedArray = arr.slice(startIndex, endIndex + size) as T;
  const newSlicedArray = new Array(slicedArray.length) as T;

  let index = 0;

  for (const item of slicedArray) {
    if (item === undefined || item === null) {
      if (options?.keepEmptyPositions) newSlicedArray[index++] = undefined;
      continue;
    }

    const id = typeof item === 'object' ? item.id : item;

    if (id !== undefined && seen.has(id)) {
      if (options?.keepEmptyPositions) newSlicedArray[index++] = undefined;
      continue;
    }

    if (id !== undefined) seen.add(id);
    newSlicedArray[index++] = item;
  }

  const result = startArray.concat(newSlicedArray, endArray) as T;
  console.log({ arr, startArray, slicedArray, endArray, result });
  return result;
};
