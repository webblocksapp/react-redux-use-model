export const getStringArrayChanges = (
  prevArray: string[],
  newArray: string[]
) => {
  const forRemove = [];
  const forAdd = [];

  for (const prevItem of prevArray) {
    if (!newArray.includes(prevItem)) {
      forRemove.push(prevItem);
    }
  }

  for (const newItem of newArray) {
    if (!prevArray.includes(newItem)) {
      forAdd.push(newItem);
    }
  }

  return { forRemove, forAdd };
};
