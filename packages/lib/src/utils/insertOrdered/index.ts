export const insertOrdered = <T>(
  array: Array<T>,
  newData: T,
  compareFn: (args: { existingItem: T; itemToInsert: T }) => boolean
): T[] => {
  const newArray = [...array];
  let insertIndex = 0;

  while (
    insertIndex < newArray.length &&
    compareFn({
      existingItem: newArray[insertIndex],
      itemToInsert: newData,
    })
  ) {
    insertIndex++;
  }

  // Insert the new data into the array at the found index
  newArray.splice(insertIndex, 0, newData);
  return newArray;
};
