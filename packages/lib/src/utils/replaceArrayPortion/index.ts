import { removeArrayDuplicates } from '@utils';

/**
 * Replaces a portion of an array with elements from another array.
 *
 * @template T - The type of elements in the arrays.
 * @param {object} args - An object containing parameters for the replacement operation.
 * @param {T[]} args.originalArray - The original array to be modified.
 * @param {T[]} args.replacementArray - The array containing elements to replace in the original array.
 * @param {number} args.startIndex - The starting index in the original array where replacement begins.
 * @param {number} args.endIndex - The ending index in the original array where replacement ends.
 * @param {boolean} args.keepEmptyPositions - A boolean flag for keeping undefined index positions.
 * @returns {T[]} - A new array with the specified portion replaced by elements from the replacement array.
 *
 * @example
 * const originalArray = [1, 2, 3, 4, 5];
 * const replacementArray = [10, 20];
 * const startIndex = 1;
 * const endIndex = 2;
 *
 * const newArray = replaceArrayPortion({
 *   originalArray,
 *   replacementArray,
 *   startIndex,
 *   endIndex,
 * });
 *
 * // newArray is now [1, 10, 20, 4, 5]
 */
export const replaceArrayPortion = <T extends Array<any>>(args: {
  originalArray: T;
  replacementArray: T;
  startIndex: number;
  endIndex: number;
  keepEmptyPositions?: boolean;
  removeDuplicates?: boolean;
  replaceWhenEmpty?: boolean;
  size?: number;
}) => {
  let {
    originalArray,
    replacementArray,
    startIndex,
    keepEmptyPositions = false,
    removeDuplicates = false,
    replaceWhenEmpty = false,
    size = 0,
  } = args;
  let resultingArray = [...originalArray];
  replacementArray = [...replacementArray] as T;
  const endIndex = args.endIndex;
  const positionsLength = endIndex - startIndex + 1;
  let index = 0;
  replacementArray.splice(positionsLength);

  if (keepEmptyPositions) {
    for (let i = 0; i <= startIndex; i++) {
      if (replaceWhenEmpty) {
        resultingArray[i] = resultingArray[i]
          ? resultingArray[i]
          : originalArray[i];
      } else {
        resultingArray[i] = originalArray[i];
      }
    }

    for (let i = startIndex; i <= endIndex; i++) {
      const newItem = replacementArray[index];
      if (replaceWhenEmpty) {
        resultingArray[i] = resultingArray[i] ? resultingArray[i] : newItem;
      } else {
        resultingArray[i] = newItem;
      }
      index++;
    }
  } else {
    resultingArray.splice(startIndex, positionsLength, ...replacementArray);
  }

  if (removeDuplicates) {
    resultingArray = removeArrayDuplicates(resultingArray, {
      startIndex,
      endIndex,
      size,
    });
  }

  return resultingArray;
};
