import {
  CrudOperation,
  Entity,
  ForeignKey,
  ModelSchema,
  NormalizedEntitiesState,
} from '@interfaces';
import { clone, get, getStringArrayChanges, set } from '@utils';

export const handleForeignKeys = (args: {
  entity: Entity;
  prevEntity?: Entity;
  schema: ModelSchema;
  state: NormalizedEntitiesState;
  operation: CrudOperation;
}) => {
  let { entity, prevEntity, schema, state, operation } = args;

  for (let foreignKey of schema?.foreignKeys || []) {
    const foreignEntityName = foreignKey.foreignEntityName;
    const foreignKeyName = foreignKey.foreignKeyName;
    const foreignFieldName = foreignKey.foreignFieldName;

    let prevForeignEntityIds: string[] = prevEntity?.[foreignKeyName] || [];
    prevForeignEntityIds = Array.isArray(prevForeignEntityIds)
      ? prevForeignEntityIds
      : [prevForeignEntityIds];

    let foreignEntityIds: string[] =
      operation === 'update' ? entity[foreignKeyName] || [] : [];
    foreignEntityIds = Array.isArray(foreignEntityIds)
      ? foreignEntityIds
      : [foreignEntityIds];

    const changes = getStringArrayChanges(
      prevForeignEntityIds,
      foreignEntityIds
    );

    state = handleForeignEntityIds({
      state,
      entity,
      foreignKey,
      foreignEntityIds: changes.forAdd,
      foreignEntityName,
      foreignFieldName,
      operation: operation === 'update' ? 'create' : operation,
    });

    state = handleForeignEntityIds({
      state,
      entity,
      foreignKey,
      foreignEntityIds: changes.forRemove,
      foreignEntityName,
      foreignFieldName,
      operation: operation === 'update' ? 'remove' : operation,
    });
  }

  return state;
};

const handleForeignEntityIds = (args: {
  state: NormalizedEntitiesState;
  entity: Entity;
  foreignKey: ForeignKey;
  foreignEntityIds: string[];
  foreignEntityName: string;
  foreignFieldName: string;
  operation: CrudOperation;
}) => {
  let {
    entity,
    foreignEntityIds,
    foreignEntityName,
    foreignFieldName,
    foreignKey,
    operation,
    state,
  } = args;
  for (const foreignEntityId of foreignEntityIds) {
    const entityState = state[foreignEntityName];
    if (entityState?.byId && foreignEntityId) {
      const byId = entityState.byId;
      const { [foreignEntityId]: parentEntity, ...restById } = byId;
      const entityIds = get<Array<string> | string>(
        parentEntity,
        foreignFieldName
      );

      let updatedParentEntity: Entity | undefined;

      switch (operation) {
        case 'create': {
          let value: any;

          if (foreignKey.foreignFieldDataType === 'array') {
            value = get(parentEntity, foreignFieldName) || [];
            value = [...value, entity.id];
          } else {
            value = entity.id;
          }

          updatedParentEntity = set(
            clone(parentEntity),
            foreignFieldName,
            value
          );
          break;
        }
        case 'remove':
          updatedParentEntity = set(
            clone(parentEntity),
            foreignFieldName,
            Array.isArray(entityIds)
              ? entityIds.filter((id) => id !== entity?.id)
              : undefined
          );
          break;
        default:
          break;
      }

      if (updatedParentEntity) {
        state = {
          ...state,
          [foreignEntityName]: {
            ...entityState,
            byId: { ...restById, [foreignEntityId]: updatedParentEntity },
          },
        };
      }
    }
  }

  return state;
};
