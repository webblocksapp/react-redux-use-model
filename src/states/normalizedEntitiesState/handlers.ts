import {
  Entity,
  ForeignKey,
  NormalizedEntitiesState,
  QueryState,
} from '@interfaces';
import {
  buildEmptyIds,
  calcPage,
  calcPageSize,
  calcPagination,
  calcPaginationIndexes,
  clone,
  get,
  handlePagination,
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
  sizeMultiplier: number | undefined,
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
        sizeMultiplier,
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

export const create = (
  entityName: string,
  entity: Entity,
  _: string | undefined,
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
      queries: entityState?.queries?.map((query) => {
        return {
          ...query,
          ...(query.pagination
            ? {
                pagination: handlePagination({
                  pagination: query.pagination,
                  operation: 'create',
                }),
                ids: (() => {
                  const newIds = [...query.ids];
                  const { startIndex } = calcPaginationIndexes({
                    ...query.pagination,
                    page: query?.currentPage || query.pagination.page,
                  });
                  entity.id && newIds.splice(startIndex, 0, entity.id);
                  return newIds;
                })(),
              }
            : {}),
        };
      }),
    };
  }

  return {
    ...state,
    ...normalizedState,
  };
};

export const update = (
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
      byId: {
        ...entityState?.byId,
        ...(entity.id
          ? {
              [entity.id]: {
                ...entityState?.byId?.[entity.id],
                ...value[entity.id],
              },
            }
          : {}),
      },
      allIds: mergeUniqueIds(entityState?.allIds || [], newIds),
    };
  }

  return {
    ...state,
    ...normalizedState,
  };
};

export const read = (
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
        ...(query.pagination
          ? {
              pagination: handlePagination({
                pagination: query.pagination,
                operation: 'remove',
              }),
            }
          : {}),
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
        const updatedParentEntity = set(
          clone(parentEntity),
          foreignFieldName,
          entityIds.filter((id) => id !== entity?.id)
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
  size: number,
  sizeMultiplier: number,
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

            const calculatedPagination = calcPagination({
              page,
              size,
              sizeMultiplier,
              totalPages: pagination.totalPages,
              totalElements: pagination.totalElements,
            });

            const calculatedCurrentPage = calcPage({
              page,
              size,
              sizeMultiplier,
            });

            return {
              ...item,
              ids: mergeIds(
                item.ids,
                buildEmptyIds({
                  size: calcPageSize({ size: pagination.size, sizeMultiplier }),
                }),
                pagination,
                { replaceWhenEmpty: true }
              ),
              pagination,
              calculatedPagination,
              currentPage: page,
              calculatedCurrentPage,
            };
          }
        }
        return item;
      }),
    },
  };
};

export const invalidateQuery = (
  entityName: string,
  queryKey: string,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  const entityState = state[entityName];

  return {
    ...state,
    [entityName]: {
      ...entityState,
      queries: entityState?.queries?.map((query) => {
        if (query.queryKey === queryKey) {
          return {
            queryKey,
            ids: [],
            calculatedCurrentPage: undefined,
            calculatedPagination: undefined,
            currentPage: undefined,
            params: undefined,
          };
        }
        return query;
      }),
    },
  };
};
