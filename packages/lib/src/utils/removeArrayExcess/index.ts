export const removeArrayExcess = <T extends Array<any>>(
  arr: T,
  totalElements: number
) => {
  if (arr.length > totalElements) {
    const n = arr.length - totalElements;
    arr.splice(-n);
  }

  return arr;
};
