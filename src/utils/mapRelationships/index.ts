import { ModelSchema } from '@interfaces';

export const mapRelationships = (relationships: ModelSchema['relationships']) =>
  (relationships || []).map((item) => ({
    fieldName: item.fieldName,
    newFieldName: item.entityName,
  }));
