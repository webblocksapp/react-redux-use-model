import {
  Entity,
  ModelSchema,
  NormalizedEntitiesState,
  QueryState,
} from '@interfaces';
import {
  buildEmptyIds,
  calcPage,
  calcPageSize,
  calcPagination,
  calcPaginationIndexes,
  handleForeignKeys,
  handlePagination,
  mapRelationships,
  mergeIds,
  mergeQueries,
  mergeUniqueIds,
  normalizer,
} from '@utils';

export const initializeQuery = (
  entityName: string,
  queryKey: string | undefined,
  initialLoadingSize: number,
  timestamp: number,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let updatedState = { ...state };
  const entityState = state[entityName];

  if (
    entityState?.queries?.some((query) => query.queryKey === queryKey) ||
    queryKey === undefined
  ) {
    return state;
  }

  updatedState = {
    ...updatedState,
    [entityName]: {
      ...entityState,
      queries: [
        ...(entityState?.queries || []),
        { queryKey, ids: Array(initialLoadingSize).fill(null), timestamp },
      ],
    },
  };

  return updatedState;
};

export const list = (
  entityName: string,
  entities: Entity[],
  schema: ModelSchema | undefined,
  currentPage: number | undefined,
  queryKey: string | undefined,
  pagination: QueryState['pagination'],
  sizeMultiplier: number | undefined,
  params: any,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let updatedState = { ...state };
  const map = mapRelationships(schema?.relationships);

  for (let [key, value] of Object.entries(
    normalizer(entities, entityName, map)
  )) {
    const entityState = state[key];
    const newIds = Object.keys(value);

    updatedState = {
      ...updatedState,
      [key]: {
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
      },
    };
  }

  return updatedState;
};

export const create = (
  entityName: string,
  entity: Entity,
  schema: ModelSchema | undefined,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let updatedState = { ...state };
  const map = mapRelationships(schema?.relationships);

  for (let [key, value] of Object.entries(
    normalizer(entity, entityName, map)
  )) {
    const entityState = state[key];
    const newIds = Object.keys(value);

    updatedState = {
      ...updatedState,
      [key]: {
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
      },
    };
  }

  if (entity && schema) {
    updatedState = handleForeignKeys({
      entity,
      schema,
      state: updatedState,
      operation: 'create',
    });
  }

  return updatedState;
};

export const update = (
  entityName: string,
  entity: Entity,
  prevEntity: Entity | undefined,
  schema: ModelSchema | undefined,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let updatedState = { ...state };
  const map = mapRelationships(schema?.relationships);

  for (let [key, value] of Object.entries(
    normalizer(entity, entityName, map)
  )) {
    const entityState = state[key];
    const newIds = Object.keys(value);

    updatedState = {
      ...updatedState,
      [key]: {
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
      },
    };
  }

  if (entity && schema) {
    updatedState = handleForeignKeys({
      entity,
      prevEntity,
      schema,
      state: updatedState,
      operation: 'update',
    });
  }

  return updatedState;
};

export const read = (
  entityName: string,
  entity: Entity,
  schema: ModelSchema | undefined,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let updatedState = { ...state };
  const map = mapRelationships(schema?.relationships);

  for (let [key, value] of Object.entries(
    normalizer(entity, entityName, map)
  )) {
    const entityState = state[key];
    const newIds = Object.keys(value);

    updatedState = {
      ...updatedState,
      [key]: {
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
      },
    };
  }

  return updatedState;
};

export const remove = (
  entityName: string,
  entityId: string | number,
  schema: ModelSchema | undefined,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let updatedState = { ...state };
  let entity: Entity | undefined;
  const entityState = state[entityName];

  if (entityState?.byId) {
    const byId = entityState.byId;
    const { [entityId]: removedEntity, ...restById } = byId;

    entity = removedEntity;
    updatedState = {
      ...updatedState,
      [entityName]: {
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
      },
    };
  }

  if (entity && schema) {
    updatedState = handleForeignKeys({
      entity,
      schema,
      state: updatedState,
      operation: 'remove',
    });
  }

  return updatedState;
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
            ...query,
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
