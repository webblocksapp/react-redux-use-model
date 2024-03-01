export const normalizeArray = <T extends Array<{ id: string }>>(data: T) => {
  const obj: { [id: string]: T[number] } = {};

  for (let item of data) {
    obj[item.id] = item;
  }

  return obj;
};
