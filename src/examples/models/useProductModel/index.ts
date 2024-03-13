import { EntityName } from '@examples/constants';
import { useProductApiClient } from '@examples/apiClients';
import { useModel } from '@hooks';
import { EntityActionType } from '@constants';

export const useProductModel = (options?: { queryKey?: string }) => {
  const productApiClient = useProductApiClient();
  const model = useModel({
    entityName: EntityName.Products,
    queryKey: options?.queryKey,
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
    },
  });

  return model;
};
