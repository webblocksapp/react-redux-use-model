import { EntityParams, ListResponse, Product } from '@interfaces';
import { axiosLocal } from '@utils';

export const useProductApiClient = () => {
  const list = async (params?: EntityParams<Product>) => {
    const { data } = await axiosLocal.get<ListResponse<Product>>('/products', {
      params: { _size: 10, _page: 0, ...params },
    });
    return data;
  };

  return { list };
};
