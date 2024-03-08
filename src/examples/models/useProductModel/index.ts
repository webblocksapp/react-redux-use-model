import { EntityName } from '@examples/constants';
import { useProductApiClient } from '@examples/apiClients';
import { useQueryHandler } from '@hooks';
import { EntityActionType } from '@constants';

export const useProductModel = (options?: { queryKey?: string }) => {
  const productApiClient = useProductApiClient();
  const queryHandler = useQueryHandler({
    entityName: EntityName.Products,
    queryKey: options?.queryKey,
    handlers: {
      list: {
        apiFn: productApiClient.list,
        action: EntityActionType.LIST,
      },
    },
  });

  return queryHandler;
};
