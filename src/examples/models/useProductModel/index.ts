import { EntityName } from '@examples/constants';
import { useProductApiClient } from '@examples/apiClients';
import { EntityActionType, useModel } from 'react-redux-use-model';

export const useProductModel = (options?: { queryKey?: string }) => {
  const productApiClient = useProductApiClient();
  const model = useModel({
    entityName: EntityName.Products,
    queryKey: options?.queryKey,
    paginationConfig: { sizeMultiplier: 5 },
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
