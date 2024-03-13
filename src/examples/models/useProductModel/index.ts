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
        refetchHandler: 'list',
        apiFn: productApiClient.create,
      },
    },
  });

  return model;
};
