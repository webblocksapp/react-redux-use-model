export const removeArrayDuplicates = <
  T extends Array<{ id?: string | number } | string | number | undefined>
>(
  arr: T,
  options?: { keepEmptyPositions: boolean }
): T => {
  const seen = new Set<string | number>();
  const newArray = new Array(arr.length) as T;

  let index = 0;

  for (const item of arr) {
    if (item === undefined || item === null) {
      if (options?.keepEmptyPositions) newArray[index++] = undefined;
      continue;
    }

    const id = typeof item === 'object' ? item.id : item;

    if (id !== undefined && seen.has(id)) {
      if (options?.keepEmptyPositions) newArray[index++] = undefined;
      continue;
    }

    if (id !== undefined) seen.add(id);
    newArray[index++] = item;
  }

  newArray.length = index; // Trim excess undefined values

  return newArray;
};
