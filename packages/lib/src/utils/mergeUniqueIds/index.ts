export const mergeUniqueIds = (
  ids1: Array<string | number>,
  ids2: Array<string | number>
) => {
  return Array.from(new Set(ids1.concat(ids2)));
};
