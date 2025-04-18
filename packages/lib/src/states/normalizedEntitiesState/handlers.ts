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
  produceIds,
  updateQueryPagination,
} from '@utils';

export const initializeQuery = (
  entityName: string,
  queryKey: string,
  initialLoadingSize: number,
  timestamp: number,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  const entityState = state[entityName];
  const tempIds = Array(initialLoadingSize).fill(null);

  return {
    ...state,
    [entityName]: {
      ...entityState,
      queries: [
        ...(entityState?.queries || []),
        {
          queryKey,
          ids: produceIds({
            entityName,
            queryKey,
            method: () => tempIds,
            eventName: 'initializeQuery',
            pagination: {
              page: 0,
              size: initialLoadingSize,
              totalElements: initialLoadingSize,
              totalPages: 1,
            },
          }),
          timestamp,
          loading: true,
          listing: false,
          creating: false,
          updating: false,
          removing: false,
          reading: false,
          hasRecords: Boolean(tempIds.length),
        },
      ],
    },
  };
};

export const updateQueryLoaders = (
  entityName: string,
  queryKey: string | undefined,
  loaders: {
    loading?: boolean;
    listing?: boolean;
    creating?: boolean;
    updating?: boolean;
    removing?: boolean;
    reading?: boolean;
  },
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  const entityState = state[entityName];

  return {
    ...state,
    [entityName]: {
      ...entityState,
      queries: (entityState?.queries || []).map((query) => {
        if (
          query.queryKey === queryKey ||
          queryKey === undefined ||
          queryKey === ''
        ) {
          return {
            ...query,
            loading: loaders.loading ?? query.loading,
            listing: loaders.listing ?? query.listing,
            creating: loaders.creating ?? query.creating,
            updating: loaders.updating ?? query.updating,
            removing: loaders.removing ?? query.removing,
            reading: loaders.reading ?? query.reading,
          };
        }
        return query;
      }),
    },
  };
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
  invalidatedQuery: boolean | undefined,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  let updatedState = { ...state };
  const map = mapRelationships(schema?.relationships);

  for (const [key, normalizedValue] of Object.entries(
    normalizer(entities, entityName, map)
  )) {
    const { allIds: newIds, ...value } = normalizedValue;
    const entityState = state[key];

    updatedState = {
      ...updatedState,
      [key]: {
        ...entityState,
        byId: { ...entityState?.byId, ...value },
        allIds: mergeUniqueIds(entityState?.allIds || [], newIds),
        ...(entityName === key
          ? {
              queries: mergeQueries({
                entityName,
                queries: entityState?.queries || [],
                queryKey,
                ids: newIds,
                pagination,
                sizeMultiplier,
                currentPage,
                params,
                invalidatedQuery,
              }),
            }
          : {}),
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

  for (const [key, normalizedValue] of Object.entries(
    normalizer(entity, entityName, map)
  )) {
    const { allIds: newIds, ...value } = normalizedValue;
    const entityState = state[key];

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
                  ids: produceIds({
                    entityName,
                    queryKey: query.queryKey,
                    eventName: 'create',
                    pagination: query.calculatedPagination,
                    method: ({ currentIds }) => {
                      const newIds = [...currentIds];
                      const { startIndex } = calcPaginationIndexes({
                        ...query.pagination!,
                        page: query?.currentPage || query.pagination!.page,
                      });
                      entity.id && newIds.splice(startIndex, 0, entity.id);
                      return newIds;
                    },
                  }),
                  hasRecords: Boolean(newIds.length),
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

  for (const [key, normalizedValue] of Object.entries(
    normalizer(entity, entityName, map)
  )) {
    const { allIds: newIds, ...value } = normalizedValue;
    const entityState = state[key];

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

  for (const [key, normalizedValue] of Object.entries(
    normalizer(entity, entityName, map)
  )) {
    const { allIds: newIds, ...value } = normalizedValue;
    const entityState = state[key];

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
        allIds: (entityState?.allIds || []).filter((id) => {
          return id != entityId;
        }),
        queries: entityState?.queries?.map?.((query) => {
          const filteredIds = query.ids.filter((id) => {
            return id != entityId;
          });
          return {
            ...query,
            ids: produceIds({
              entityName,
              eventName: 'remove',
              queryKey: query.queryKey,
              pagination: query.calculatedPagination,
              method: ({ currentIds }) => {
                const filteredIds = currentIds.filter((id) => {
                  return id != entityId;
                });
                return filteredIds;
              },
            }),
            hasRecords: Boolean(filteredIds.length),
            ...(query.pagination
              ? {
                  pagination: handlePagination({
                    pagination: query.pagination,
                    operation: 'remove',
                  }),
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
        if (item.queryKey === queryKey && item.pagination) {
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

          updateQueryPagination({ entityName, queryKey }, calculatedPagination);

          const calculatedCurrentPage = calcPage({
            page,
            size,
            sizeMultiplier,
          });

          return {
            ...item,
            ids: produceIds({
              entityName,
              eventName: 'goToPage',
              queryKey,
              pagination: calculatedPagination,
              method: ({ currentIds }) => {
                return mergeIds(
                  currentIds,
                  buildEmptyIds({
                    size: calcPageSize({
                      size: pagination.size,
                      sizeMultiplier,
                    }),
                  }),
                  calculatedPagination,
                  { replaceWhenEmpty: true }
                );
              },
            }),
            pagination,
            calculatedPagination,
            currentPage: page,
            calculatedCurrentPage,
          };
        }
        return item;
      }),
    },
  };
};

export const invalidateQuery = (
  entityName: string,
  queryKey: string,
  ids: Array<string | number>,
  initialLoadingSize: number,
  state: NormalizedEntitiesState
): NormalizedEntitiesState => {
  const entityState = state[entityName];
  const tempIds = ids.length ? ids : Array(initialLoadingSize).fill(null);

  return {
    ...state,
    [entityName]: {
      ...entityState,
      queries: entityState?.queries?.map((query) => {
        if (query.queryKey === queryKey) {
          return {
            ...query,
            queryKey,
            ids: produceIds({
              pagination: query.calculatedPagination,
              entityName,
              queryKey,
              method: () => tempIds,
              eventName: 'invalidateQuery',
            }),
            calculatedCurrentPage: undefined,
            calculatedPagination: undefined,
            currentPage: undefined,
            params: undefined,
            hasRecords: Boolean(tempIds.length),
          };
        }
        return query;
      }),
    },
  };
};
