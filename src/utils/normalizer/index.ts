import { AnyObject, Entity } from '@interfaces';

export const normalizer = <T extends Array<Entity> | Entity>(
  data: T,
  fieldName: string,
  map: Array<{
    fieldName: string;
    newFieldName: string | ((entity: Entity) => string | undefined);
  }> = [],
  result: AnyObject = {}
): { [key: string]: { [key: string]: { id?: string } } } => {
  const newFieldName = map.find(
    (item) => item.fieldName == fieldName
  )?.newFieldName;

  if (typeof newFieldName === 'string') {
    fieldName = newFieldName ? newFieldName : fieldName;
  }

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
        } else if (typeof value === 'object' && (value as Entity).id) {
          result[fieldName][data.id][key] = (value as Entity).id;

          const newFieldName = map.find(
            (item) => item.fieldName == key
          )?.newFieldName;

          if (typeof newFieldName === 'string') {
            fieldName = newFieldName ? newFieldName : key;
          }

          if (typeof newFieldName === 'function') {
            fieldName = newFieldName(data) || key;
          }

          normalizer(value, fieldName, map, result);
        }
      }
    }
  }

  return result;
};
