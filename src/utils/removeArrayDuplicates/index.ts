export const removeArrayDuplicates = <
  T extends Array<{ id?: string | number }>
>(
  arr: T
) => {
  const ids: Array<string | number> = [];
  return arr.map((item) => {
    if (item?.id && ids.includes(item.id)) {
      return undefined;
    } else {
      item?.id && ids.push(item.id);
      return item;
    }
  });
};
