import { EntityName } from '@examples/constants';
import { useProductApiClient } from '@examples/apiClients';
import { EntityActionType, useModel } from 'react-redux-use-model';
import { Product } from '@examples/interfaces';
import { QueryHandlers } from '@interfaces';

export const useProductModel = () => {
  const productApiClient = useProductApiClient();
  const model = useModel<Product, QueryHandlers<Product>>({
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
