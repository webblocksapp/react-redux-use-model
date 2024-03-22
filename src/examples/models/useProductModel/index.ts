import { EntityName } from '@examples/constants';
import { useProductApiClient } from '@examples/apiClients';
import {
  EntityActionType,
  useModel,
  ListQueryHandler,
  CreateQueryHandler,
  UpdateQueryHandler,
  RemoveQueryHandler,
} from 'react-redux-use-model';
import { Product } from '@examples/interfaces';

export const useProductModel = () => {
  const productApiClient = useProductApiClient();
  const model = useModel<
    Product,
    {
      list: ListQueryHandler<Product>;
      create: CreateQueryHandler<Product>;
      update: UpdateQueryHandler<Product>;
      remove: RemoveQueryHandler<Product>;
    }
  >({
    entityName: EntityName.Products,
    config: {
      paginationSizeMultiplier: 5,
    },
    handlers: {
      list: {
        apiFn: productApiClient.list,
        action: EntityActionType.LIST,
      },
      create: {
        action: EntityActionType.CREATE,
        apiFn: productApiClient.create,
      },
      update: {
        action: EntityActionType.UPDATE,
        apiFn: productApiClient.update,
      },
      remove: {
        action: EntityActionType.REMOVE,
        apiFn: productApiClient.remove,
      },
    },
  });

  return model;
};
