import { EntityName } from '@examples/constants';
import { useAnimalApiClient } from '@examples/apiClients';
import {
  EntityActionType,
  useModel,
  ListQueryHandler,
  CreateQueryHandler,
  UpdateQueryHandler,
  RemoveQueryHandler,
} from 'react-redux-use-model';
import { Animal } from '@examples/interfaces';
import { ReadQueryHandler } from '@interfaces';

export const useAnimalModel = () => {
  const animalApiClient = useAnimalApiClient();
  const model = useModel<
    Animal,
    {
      list: ListQueryHandler<Animal>;
      create: CreateQueryHandler<Animal>;
      update: UpdateQueryHandler<Animal>;
      read: ReadQueryHandler<Animal>;
      remove: RemoveQueryHandler<Animal>;
    }
  >({
    entityName: EntityName.Animals,
    config: {
      paginationSizeMultiplier: 5,
    },
    handlers: {
      list: {
        apiFn: animalApiClient.list,
        action: EntityActionType.LIST,
      },
      read: {
        apiFn: animalApiClient.read,
        action: EntityActionType.READ,
      },
      create: {
        action: EntityActionType.CREATE,
        apiFn: animalApiClient.create,
      },
      update: {
        action: EntityActionType.UPDATE,
        apiFn: animalApiClient.update,
      },
      remove: {
        action: EntityActionType.REMOVE,
        apiFn: animalApiClient.remove,
      },
    },
  });

  return model;
};
