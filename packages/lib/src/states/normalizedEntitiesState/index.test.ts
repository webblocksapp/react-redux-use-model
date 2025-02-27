import { EntityActionType, EntityHelperActionType } from '@constants';
import { normalizedEntitiesState } from '@states/normalizedEntitiesState';

describe('normalizedEntitiesState', () => {
  it('Normalization of multiple entities with list action.', () => {
    const entities = [{ id: '1', name: 'name 1' }];
    const state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities,
        entityName: 'Users',
        queryKey: 'UsersList',
        schema: undefined,
      }
    );

    expect(state).toEqual({
      Users: {
        byId: {
          ['1']: { id: '1', name: 'name 1' },
        },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'UsersList',
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
    });
  });

  it('Normalization of multiple entities with list action and passed query data.', () => {
    const entities = [
      { id: '1', name: 'name 1' },
      { id: '2', name: 'name 2' },
    ];
    const state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities,
        entityName: 'Users',
        queryKey: 'UsersList',
        pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
        schema: undefined,
      }
    );

    expect(state).toEqual({
      Users: {
        byId: {
          ['1']: { id: '1', name: 'name 1' },
          ['2']: { id: '2', name: 'name 2' },
        },
        allIds: ['1', '2'],
        queries: [
          {
            ids: ['1', '2'],
            queryKey: 'UsersList',
            pagination: { page: 0, size: 2, totalElements: 6, totalPages: 3 },
            calculatedPagination: {
              page: 0,
              size: 2,
              totalElements: 6,
              totalPages: 3,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
    });
  });

  it('Normalization of multiple set of entities with a pagination gap.', () => {
    const entities1 = [
      { id: '1', name: 'name 1' },
      { id: '2', name: 'name 2' },
    ];
    const pagination1 = { page: 0, size: 2, totalElements: 6, totalPages: 3 };
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        entityName: 'Users',
        queryKey: 'UsersList',
        pagination: pagination1,
        schema: undefined,
      }
    );

    const entities2 = [
      { id: '5', name: 'name 5' },
      { id: '6', name: 'name 6' },
    ];
    const pagination2 = { page: 2, size: 2, totalElements: 6, totalPages: 3 };
    state = normalizedEntitiesState(state, {
      type: EntityActionType.LIST,
      entities: entities2,
      entityName: 'Users',
      queryKey: 'UsersList',
      pagination: pagination2,
      schema: undefined,
    });

    expect(state).toEqual({
      Users: {
        byId: {
          ['1']: { id: '1', name: 'name 1' },
          ['2']: { id: '2', name: 'name 2' },
          ['5']: { id: '5', name: 'name 5' },
          ['6']: { id: '6', name: 'name 6' },
        },
        allIds: ['1', '2', '5', '6'],
        queries: [
          {
            ids: ['5', '6'],
            queryKey: 'UsersList',
            pagination: { page: 2, size: 2, totalElements: 6, totalPages: 3 },
            calculatedPagination: {
              page: 2,
              size: 2,
              totalElements: 6,
              totalPages: 3,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
    });
  });

  it('Dispatch update action.', () => {
    const entities1 = [{ id: '1', name: 'name 1' }];
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        queryKey: 'UsersList',
        entityName: 'Users',
        schema: undefined,
      }
    );

    state = normalizedEntitiesState(state, {
      type: EntityActionType.UPDATE,
      entity: { id: '1', name: 'updated name 1' },
      entityName: 'Users',
      schema: undefined,
    });

    expect(state).toEqual({
      Users: {
        byId: {
          ['1']: { id: '1', name: 'updated name 1' },
        },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'UsersList',
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
    });
  });

  it('Dispatch remove action.', () => {
    const entities1 = [{ id: '1', name: 'name 1' }];
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        queryKey: 'UsersList',
        entityName: 'Users',
        pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
        schema: undefined,
      }
    );

    state = normalizedEntitiesState(state, {
      type: EntityActionType.REMOVE,
      entityId: '1',
      entityName: 'Users',
      schema: { foreignKeys: [] },
    });

    expect(state).toEqual({
      Users: {
        byId: {},
        allIds: [],
        queries: [
          {
            ids: [],
            queryKey: 'UsersList',
            pagination: { page: 0, size: 10, totalElements: 0, totalPages: 0 },
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: false,
          },
        ],
      },
    });
  });

  it('Dispatch remove action of entity with foreign key.', () => {
    const entities1 = [{ id: '1', name: 'name 1', comments: ['1', '2'] }];
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        queryKey: 'VideosList',
        entityName: 'Videos',
        pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
        schema: undefined,
      }
    );

    const entities2 = [{ id: '1', name: 'I liked the video', videoId: '1' }];
    state = normalizedEntitiesState(state, {
      type: EntityActionType.LIST,
      entities: entities2,
      queryKey: 'CommentsList',
      entityName: 'Videos.Comments',
      schema: undefined,
    });

    expect(state).toEqual({
      Videos: {
        byId: { '1': { id: '1', name: 'name 1', comments: ['1', '2'] } },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'VideosList',
            pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
      'Videos.Comments': {
        byId: { '1': { id: '1', name: 'I liked the video', videoId: '1' } },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'CommentsList',
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
    });

    state = normalizedEntitiesState(state, {
      type: EntityActionType.REMOVE,
      entityId: '1',
      entityName: 'Videos.Comments',
      schema: {
        foreignKeys: [
          {
            foreignEntityName: 'Videos',
            foreignKeyName: 'videoId',
            foreignFieldName: 'comments',
          },
        ],
      },
    });

    expect(state).toEqual({
      Videos: {
        byId: { '1': { id: '1', name: 'name 1', comments: ['2'] } },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'VideosList',
            pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
      'Videos.Comments': {
        byId: {},
        allIds: [],
        queries: [
          {
            ids: [],
            queryKey: 'CommentsList',
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: false,
          },
        ],
      },
    });
  });

  it('Dispatch remove action of entity with multiple foreign keys.', () => {
    const entities1 = [
      { id: '1', name: 'Business 1', associatedContacts: ['1', '2'] },
      { id: '2', name: 'Business 2', associatedContacts: ['1'] },
    ];
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        queryKey: 'BusinessesList',
        entityName: 'Businesses',
        pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
        schema: undefined,
      }
    );

    const entities2 = [
      { id: '1', name: 'Contact 1', businessesIds: ['1', '2'] },
    ];
    state = normalizedEntitiesState(state, {
      type: EntityActionType.LIST,
      entities: entities2,
      queryKey: 'ContactsList',
      entityName: 'Contacts',
      schema: undefined,
    });

    expect(state).toEqual({
      Businesses: {
        byId: {
          '1': { id: '1', name: 'Business 1', associatedContacts: ['1', '2'] },
          '2': { id: '2', name: 'Business 2', associatedContacts: ['1'] },
        },
        allIds: ['1', '2'],
        queries: [
          {
            ids: ['1', '2'],
            queryKey: 'BusinessesList',
            pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
      Contacts: {
        byId: {
          '1': { id: '1', name: 'Contact 1', businessesIds: ['1', '2'] },
        },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'ContactsList',
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
    });

    state = normalizedEntitiesState(state, {
      type: EntityActionType.REMOVE,
      entityId: '1',
      entityName: 'Contacts',
      schema: {
        foreignKeys: [
          {
            foreignEntityName: 'Businesses',
            foreignKeyName: 'businessesIds',
            foreignFieldName: 'associatedContacts',
          },
        ],
      },
    });

    expect(state).toEqual({
      Businesses: {
        byId: {
          '1': { id: '1', name: 'Business 1', associatedContacts: ['2'] },
          '2': { id: '2', name: 'Business 2', associatedContacts: [] },
        },
        allIds: ['1', '2'],
        queries: [
          {
            ids: ['1', '2'],
            queryKey: 'BusinessesList',
            pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
      Contacts: {
        byId: {},
        allIds: [],
        queries: [
          {
            ids: [],
            queryKey: 'ContactsList',
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: false,
          },
        ],
      },
    });
  });

  it('Dispatch remove action of entity with multiple foreign keys and the relationship is not an array.', () => {
    const entities1 = [
      { id: '1', name: 'Business 1', associatedContact: '1' },
      { id: '2', name: 'Business 2', associatedContact: '1' },
    ];
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        queryKey: 'BusinessesList',
        entityName: 'Businesses',
        pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
        schema: undefined,
      }
    );

    const entities2 = [
      { id: '1', name: 'Contact 1', businessesIds: ['1', '2'] },
    ];
    state = normalizedEntitiesState(state, {
      type: EntityActionType.LIST,
      entities: entities2,
      queryKey: 'ContactsList',
      entityName: 'Contacts',
      schema: undefined,
    });

    expect(state).toEqual({
      Businesses: {
        byId: {
          '1': { id: '1', name: 'Business 1', associatedContact: '1' },
          '2': { id: '2', name: 'Business 2', associatedContact: '1' },
        },
        allIds: ['1', '2'],
        queries: [
          {
            ids: ['1', '2'],
            queryKey: 'BusinessesList',
            pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
      Contacts: {
        byId: {
          '1': { id: '1', name: 'Contact 1', businessesIds: ['1', '2'] },
        },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'ContactsList',
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
    });

    state = normalizedEntitiesState(state, {
      type: EntityActionType.REMOVE,
      entityId: '1',
      entityName: 'Contacts',
      schema: {
        foreignKeys: [
          {
            foreignEntityName: 'Businesses',
            foreignKeyName: 'businessesIds',
            foreignFieldName: 'associatedContact',
          },
        ],
      },
    });

    expect(state).toEqual({
      Businesses: {
        byId: {
          '1': { id: '1', name: 'Business 1', associatedContact: undefined },
          '2': { id: '2', name: 'Business 2', associatedContact: undefined },
        },
        allIds: ['1', '2'],
        queries: [
          {
            ids: ['1', '2'],
            queryKey: 'BusinessesList',
            pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
      Contacts: {
        byId: {},
        allIds: [],
        queries: [
          {
            ids: [],
            queryKey: 'ContactsList',
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: false,
          },
        ],
      },
    });
  });

  it('Dispatch create action of entity with foreign key.', () => {
    const entities1 = [{ id: '1', name: 'Business 1' }];
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        queryKey: 'BusinessesList',
        entityName: 'Businesses',
        pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
        schema: undefined,
      }
    );

    state = normalizedEntitiesState(state, {
      type: EntityActionType.LIST,
      entities: [],
      queryKey: 'ContactsList',
      entityName: 'Contacts',
      schema: undefined,
      pagination: { page: 0, size: 10, totalElements: 0, totalPages: 1 },
    });

    state = normalizedEntitiesState(state, {
      type: EntityActionType.CREATE,
      entity: { id: '1', name: 'Contact 1', businessId: '1' },
      entityName: 'Contacts',
      schema: {
        foreignKeys: [
          {
            foreignEntityName: 'Businesses',
            foreignKeyName: 'businessId',
            foreignFieldName: 'associatedContact',
          },
        ],
      },
    });

    expect(state).toEqual({
      Businesses: {
        byId: {
          '1': { id: '1', name: 'Business 1', associatedContact: '1' },
        },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'BusinessesList',
            pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
      Contacts: {
        byId: {
          '1': { id: '1', name: 'Contact 1', businessId: '1' },
        },
        allIds: ['1'],
        queries: [
          {
            ids: ['1'],
            queryKey: 'ContactsList',
            calculatedPagination: {
              page: 0,
              size: 10,
              totalElements: 0,
              totalPages: 0,
            },
            pagination: {
              page: 0,
              size: 10,
              totalElements: 1,
              totalPages: 1,
            },
            loading: false,
            listing: false,
            creating: false,
            updating: false,
            reading: false,
            removing: false,
            hasRecords: true,
          },
        ],
      },
    });
  });

  it('Dispatch create action of entity with multiple foreign keys.', () => {
    const entities1 = [
      { id: '1', name: 'Business 1' },
      { id: '2', name: 'Business 2' },
    ];
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        queryKey: 'BusinessesList',
        entityName: 'Businesses',
        pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
        schema: undefined,
      }
    );

    state = normalizedEntitiesState(state, {
      type: EntityActionType.LIST,
      entities: [],
      queryKey: 'ContactsList',
      entityName: 'Contacts',
      schema: undefined,
      pagination: { page: 0, size: 10, totalElements: 0, totalPages: 1 },
    });

    const createConfig = {
      type: EntityActionType.CREATE as const,
      entityName: 'Contacts',
      schema: {
        foreignKeys: [
          {
            foreignEntityName: 'Businesses',
            foreignKeyName: 'businessesIds',
            foreignFieldName: 'associatedContacts',
            foreignFieldDataType: 'array',
          } as const,
        ],
      },
    };

    state = normalizedEntitiesState(state, {
      ...createConfig,
      entity: { id: '1', name: 'Contact 1', businessesIds: ['1', '2'] },
    });

    state = normalizedEntitiesState(state, {
      ...createConfig,
      entity: { id: '2', name: 'Contact 2', businessesIds: ['2'] },
    });

    expect(state).toEqual(
      expect.objectContaining({
        Businesses: expect.objectContaining({
          byId: expect.objectContaining({
            '1': { id: '1', name: 'Business 1', associatedContacts: ['1'] },
            '2': {
              id: '2',
              name: 'Business 2',
              associatedContacts: ['1', '2'],
            },
          }),
        }),
      })
    );
  });

  it('Dispatch update action of entity with a foreign key.', () => {
    const entities1 = [{ id: '1', name: 'Business 1', associatedContact: '1' }];
    let state = normalizedEntitiesState(
      {},
      {
        type: EntityActionType.LIST,
        entities: entities1,
        queryKey: 'BusinessesList',
        entityName: 'Businesses',
        pagination: { page: 0, size: 10, totalElements: 1, totalPages: 1 },
        schema: undefined,
      }
    );

    state = normalizedEntitiesState(state, {
      type: EntityActionType.LIST,
      entities: [{ id: '1', name: 'Contact 1', businessId: '1' }],
      queryKey: 'ContactsList',
      entityName: 'Contacts',
      schema: undefined,
      pagination: { page: 0, size: 10, totalElements: 0, totalPages: 1 },
    });

    const updateConfig = {
      type: EntityActionType.UPDATE as const,
      entityName: 'Contacts',
      schema: {
        foreignKeys: [
          {
            foreignEntityName: 'Businesses',
            foreignKeyName: 'businessId',
            foreignFieldName: 'associatedContact',
          } as const,
        ],
      },
    };

    state = normalizedEntitiesState(state, {
      ...updateConfig,
      prevEntity: { id: '1', name: 'Contact 1', businessId: '1' },
      entity: { id: '1', name: 'Contact 1', businessId: undefined },
    });

    expect(state).toEqual(
      expect.objectContaining({
        Businesses: expect.objectContaining({
          byId: expect.objectContaining({
            '1': { id: '1', name: 'Business 1', associatedContact: undefined },
          }),
        }),
        Contacts: expect.objectContaining({
          byId: expect.objectContaining({
            '1': { id: '1', name: 'Contact 1', businessId: undefined },
          }),
        }),
      })
    );

    state = normalizedEntitiesState(state, {
      ...updateConfig,
      prevEntity: { id: '1', name: 'Contact 1' },
      entity: { id: '1', name: 'Contact 1', businessId: '1' },
    });

    expect(state).toEqual(
      expect.objectContaining({
        Businesses: expect.objectContaining({
          byId: expect.objectContaining({
            '1': { id: '1', name: 'Business 1', associatedContact: '1' },
          }),
        }),
        Contacts: expect.objectContaining({
          byId: expect.objectContaining({
            '1': { id: '1', name: 'Contact 1', businessId: '1' },
          }),
        }),
      })
    );
  });

  it('One million total elements test.', () => {
    const entities1 = [{ id: '1', name: 'Business 1', associatedContact: '1' }];
    const queryKey = 'OneMillionList';
    const entityName = 'OneMillion';
    const totalElements = 1000000;
    const page = 100000;
    const size = 10;
    const totalPages = totalElements / size;
    const sizeMultiplier = 5;

    let state = normalizedEntitiesState(
      {},
      {
        type: EntityHelperActionType.INITIALIZE_QUERY,
        queryKey,
        entityName,
        initialLoadingSize: size,
        timestamp: 0,
      }
    );

    state = normalizedEntitiesState(state, {
      type: EntityHelperActionType.GO_TO_PAGE,
      queryKey,
      entityName,
      page,
      size,
      sizeMultiplier,
    });

    state = normalizedEntitiesState(state, {
      type: EntityActionType.LIST,
      entities: entities1,
      queryKey,
      entityName,
      pagination: {
        page,
        size,
        totalElements,
        totalPages,
      },
      schema: undefined,
    });

    const ids = state[entityName]?.queries?.[0]?.ids;
    expect(ids?.length).toBe(0);
  });
});
