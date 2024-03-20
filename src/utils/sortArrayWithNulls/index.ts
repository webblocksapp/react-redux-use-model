export const sortArrayWithNulls = (
  array: Array<number | null>
): Array<number | null> => {
  // Partitioning the array into non-null and null elements
  const nonNulls = array.filter((el) => el !== null);
  const nulls = array.filter((el) => el === null);

  // Sorting the non-null elements array
  nonNulls.sort((a, b) => (a as number) - (b as number));

  // Merging the sorted non-null elements array with the array containing null elements
  let result: Array<number | null> = [];
  let nonNullsIndex = 0;
  let nullsIndex = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === null) {
      result.push(nulls[nullsIndex]);
      nullsIndex++;
    } else {
      result.push(nonNulls[nonNullsIndex]);
      nonNullsIndex++;
    }
  }

  return result;
};
