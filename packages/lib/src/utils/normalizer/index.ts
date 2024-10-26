import { AnyObject, Entity, Id, NormalizeEntity } from '@interfaces';

export type NormalizerResult = {
  [key: string]: NormalizeEntity<Entity> & { allIds: Id[] };
};

export const normalizer = <T extends Array<Entity> | Entity>(
  data: T,
  fieldName: string,
  map: Array<{
    fieldName: string;
    newFieldName: string | ((entity: Entity) => string | undefined);
  }> = [],
  result: AnyObject = {}
): NormalizerResult => {
  const newFieldName = map.find(
    (item) => item.fieldName == fieldName
  )?.newFieldName;

  if (typeof newFieldName === 'string') {
    fieldName = newFieldName ? newFieldName : fieldName;
  }

  if (result[fieldName] === undefined) {
    result[fieldName] = { allIds: [] };
  }

  if (Array.isArray(data)) {
    for (const value of Object.values(data)) {
      normalizer(value, fieldName, map, result);
    }
  } else {
    const id = data.id;
    if (id) {
      const normalizedResult = result as NormalizerResult;
      const allIds = normalizedResult[fieldName]['allIds'];
      normalizedResult[fieldName]['allIds'] = [...allIds, id];
    }

    for (const [key, value] of Object.entries(data)) {
      if (id && result[fieldName][id] === undefined) {
        result[fieldName][id] = data;
      }

      if (id) {
        if (
          Array.isArray(value) &&
          value.some((item) => item?.id !== undefined)
        ) {
          result[fieldName][id][key] = value.map((item) => item.id);
          normalizer(value, key, map, result);
        } else if (
          typeof value === 'object' &&
          value !== null &&
          (value as Entity).id
        ) {
          result[fieldName][id][key] = (value as Entity).id;

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
