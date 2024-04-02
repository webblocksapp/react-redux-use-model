export const mergeUniqueIds = (
  ids1: Array<string | number>,
  ids2: Array<string | number>
) => {
  const allIds = [...ids1, ...ids2];
  let uniqueIds: Array<string | number> = [];

  for (let id of allIds) {
    if (uniqueIds.includes(id)) continue;
    uniqueIds = [...uniqueIds, id];
  }

  return uniqueIds;
};
