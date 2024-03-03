import { EntityName } from '@examples/constants';
import { Product, ProductQueryData } from '@examples/interfaces';
import { useProductApiClient } from '@examples/apiClients';
import { EntityParams } from '@interfaces';
import { useQueryHandler } from '@hooks';

export const useProductModel = (options?: { queryKey?: string }) => {
  const productApiClient = useProductApiClient();
  const { dispatchList, ...queryHandler } = useQueryHandler<
    Product,
    ProductQueryData
  >({
    entityName: EntityName.Product,
    queryKey: options?.queryKey,
  });

  const list = async (params?: EntityParams<Product>) => {
    try {
      const { products, pagination } = await productApiClient.list(params);
      dispatchList({
        queryKey: options?.queryKey,
        entities: products,
        queryData: { pagination },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { list, queryHandler };
};
