export const getArrayIds = <T extends Array<{ id: string }>>(data: T) => {
  return data.map((item) => item.id);
};
