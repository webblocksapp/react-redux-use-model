import {
  Entity,
  ForeignKey,
  NormalizedEntitiesState,
  QueryState,
} from '@interfaces';
import {
  buildEmptyIds,
  clone,
  get,
  mergeIds,
  mergeQueries,
  mergeUniqueIds,
  normalizer,
  set,
} from '@utils';

export const list = (
  entityName: string,
  entities: any[],
  currentPage: number | undefined,
  queryKey: string | undefined,
  pagination: QueryState['pagination'],
  params: any,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let normalizedState: NormalizedEntitiesState = {};

  for (let [key, value] of Object.entries(normalizer(entities, entityName))) {
    const entityState = state[key];
    const newIds = Object.keys(value);

    normalizedState[key] = {
      ...entityState,
      byId: { ...entityState?.byId, ...value },
      allIds: mergeUniqueIds(entityState?.allIds || [], newIds),
      queries: mergeQueries({
        queries: entityState?.queries || [],
        queryKey,
        ids: newIds,
        pagination,
        currentPage,
        params,
      }),
    };
  }

  return {
    ...state,
    ...normalizedState,
  };
};

export const save = (
  entityName: string,
  entity: Entity,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let normalizedState: NormalizedEntitiesState = {};

  for (let [key, value] of Object.entries(normalizer(entity, entityName))) {
    const entityState = state[key];
    const newIds = Object.keys(value);

    normalizedState[key] = {
      ...entityState,
      byId: { ...entityState?.byId, ...value },
      allIds: mergeUniqueIds(entityState?.allIds || [], newIds),
    };
  }

  return {
    ...state,
    ...normalizedState,
  };
};

export const remove = (
  entityName: string,
  entityId: string,
  foreignKeys: Array<ForeignKey> | undefined,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let normalizedState: NormalizedEntitiesState = {};
  let entity: Entity | undefined;
  const entityState = state[entityName];

  if (entityState?.byId) {
    const byId = entityState.byId;
    const { [entityId]: removedEntity, ...restById } = byId;

    entity = removedEntity;
    normalizedState[entityName] = {
      ...entityState,
      byId: restById,
      allIds: (entityState?.allIds || []).filter((id) => id !== entityId),
      queries: entityState?.queries?.map?.((query) => ({
        ...query,
        ids: query.ids.filter((id) => id !== entityId),
      })),
    };
  }

  if (entity) {
    for (let foreignKey of foreignKeys || []) {
      const foreignEntityName = foreignKey.foreignEntityName;
      const foreignKeyName = foreignKey.foreignKeyName;
      const foreignFieldName = foreignKey.foreignFieldName;

      const entityState = state[foreignEntityName];
      const foreignEntityId = entity[foreignKeyName];

      if (entityState?.byId) {
        const byId = entityState.byId;
        const { [foreignEntityId]: parentEntity, ...restById } = byId;
        const entityIds = get<Array<string>>(parentEntity, foreignFieldName);
        const updatedParentEntity = clone(
          set(
            parentEntity,
            foreignFieldName,
            entityIds.filter((id) => id !== entity?.id)
          )
        );

        normalizedState[foreignEntityName] = {
          ...entityState,
          byId: { [foreignEntityId]: updatedParentEntity, ...restById },
        };
      }
    }
  }

  return {
    ...state,
    ...normalizedState,
  };
};

export const goToPage = (
  entityName: string,
  queryKey: string | undefined,
  page: number,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  const entityState = state[entityName];

  return {
    ...state,
    [entityName]: {
      ...entityState,
      queries: entityState?.queries?.map((item) => {
        if (item.queryKey === queryKey) {
          if (item.pagination === undefined) {
            console.warn('queryData lacks of pagination object.');
          } else {
            const pagination = {
              ...item.pagination,
              page,
            };

            return {
              ...item,
              ids: mergeIds(
                item.ids,
                buildEmptyIds({ size: pagination.size }),
                pagination,
                { replaceWhenEmpty: true }
              ),
              pagination,
            };
          }
        }
        return item;
      }),
    },
  };
};

export const updateTimestamps = (
  entityName: string,
  timestamps: Partial<
    Extract<NormalizedEntitiesState[string], object>['timestamps']
  >,
  state: NormalizedEntitiesState
) => {
  let normalizedState: NormalizedEntitiesState = {};
  const entityState = state[entityName];

  normalizedState[entityName] = {
    ...entityState,
    timestamps: { ...entityState?.timestamps, ...timestamps },
  };

  return {
    ...state,
    ...normalizedState,
  };
};
