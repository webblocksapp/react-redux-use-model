export const normalizer = <
  T extends Array<{ id?: string | number }> | { id?: string | number }
>(
  data: T,
  entityName: string,
  result: any = {}
): { [key: string]: { [key: string]: { id?: string } } } => {
  if (result[entityName] === undefined) {
    result[entityName] = {};
  }

  if (Array.isArray(data)) {
    for (const value of Object.values(data)) {
      normalizer(value, entityName, result);
    }
  } else {
    for (const [key, value] of Object.entries(data)) {
      if (data.id && result[entityName][data.id] === undefined) {
        result[entityName][data.id] = {};
      }

      if (data.id) {
        result[entityName][data.id][key] = value;

        if (
          Array.isArray(value) &&
          value.some((item) => item?.id !== undefined)
        ) {
          result[entityName][data.id][key] = value.map((item) => item.id);
          normalizer(value, `${entityName}.${key}`, result);
        }
      }
    }
  }

  return result;
};
