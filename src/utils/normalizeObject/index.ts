export const normalizeObject = <T extends { id: string }>(data: T) => {
  return { [data.id]: data };
};
