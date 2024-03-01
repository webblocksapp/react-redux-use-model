export const mergeUniqueIds = (ids1: string[], ids2: string[]) => {
  const allIds = [...ids1, ...ids2];
  let uniqueIds: string[] = [];

  for (let id of allIds) {
    if (uniqueIds.includes(id)) continue;
    uniqueIds = [...uniqueIds, id];
  }

  return uniqueIds;
};
