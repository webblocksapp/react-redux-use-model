export const removeArrayDuplicates = <
  T extends Array<{ id?: string | number } | string | number | undefined>
>(
  arr: T,
  options?: { keepEmptyPositions: boolean }
) => {
  const ids: Array<string | number | undefined> = [];
  const newArray = [] as unknown as T;

  for (let item of arr) {
    if (typeof item === 'object') {
      if (item?.id && ids.includes(item.id)) {
        options?.keepEmptyPositions && newArray.push(undefined);
        continue;
      } else {
        item?.id && ids.push(item.id);
        newArray.push(item);
      }
    } else {
      if (ids.includes(item)) {
        options?.keepEmptyPositions && newArray.push(undefined);
        continue;
      } else {
        ids.push(item);
        newArray.push(item);
      }
    }
  }

  return newArray;
};
