import { Product } from '@interfaces';
import { axiosLocal } from '@utils';

export const useProductApiClient = () => {
  const list = async () => {
    const { data } = await axiosLocal.get<Product[]>('/products');
    return data;
  };

  return { list };
};
