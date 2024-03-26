export const normalizer = <
  T extends Array<{ id?: string | number }> | { id?: string | number }
>(
  data: T,
  fieldName: string,
  map: Array<{ fieldName: string; newFieldName: string }> = [],
  result: any = {}
): { [key: string]: { [key: string]: { id?: string } } } => {
  const newFieldName = map.find(
    (item) => item.fieldName == fieldName
  )?.newFieldName;

  fieldName = newFieldName ? newFieldName : fieldName;

  if (result[fieldName] === undefined) {
    result[fieldName] = {};
  }

  if (Array.isArray(data)) {
    for (const value of Object.values(data)) {
      normalizer(value, fieldName, map, result);
    }
  } else {
    for (const [key, value] of Object.entries(data)) {
      if (data.id && result[fieldName][data.id] === undefined) {
        result[fieldName][data.id] = {};
      }

      if (data.id) {
        result[fieldName][data.id][key] = value;

        if (
          Array.isArray(value) &&
          value.some((item) => item?.id !== undefined)
        ) {
          result[fieldName][data.id][key] = value.map((item) => item.id);
          normalizer(value, key, map, result);
        }
      }
    }
  }

  return result;
};
