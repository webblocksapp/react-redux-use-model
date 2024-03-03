import { EntityName } from '@examples/constants';
import { Product, ProductQueryData } from '@examples/interfaces';
import { useProductApiClient } from '@examples/apiClients';
import { useQueryHandler } from '@hooks';
import { EntityActionType } from '@constants';

export const useProductModel = (options?: { queryKey?: string }) => {
  const productApiClient = useProductApiClient();
  const { runApiClient: list, ...listQueryHandler } = useQueryHandler<
    Product,
    ProductQueryData
  >({
    entityName: EntityName.Product,
    queryKey: options?.queryKey,
    apiClientFn: productApiClient.list,
    action: EntityActionType.LIST,
  });

  return {
    listQuery: {
      list,
      ...listQueryHandler,
    },
  };
};
