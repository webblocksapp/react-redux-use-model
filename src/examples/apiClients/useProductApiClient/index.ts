import { Pagination, PaginationParams } from 'react-redux-use-model';
import { ListResponse, Product } from '@examples/interfaces';
import { axiosLocal } from '@examples/utils';

export const useProductApiClient = () => {
  const list = async (
    params: PaginationParams
  ): Promise<{
    data: Product[];
    pagination: Pagination;
  }> => {
    const { data } = await axiosLocal.get<ListResponse<Product>>('/products', {
      params,
    });
    return {
      data: data.content,
      pagination: {
        totalPages: data.totalPages,
        size: data.pageable.pageSize,
        page: data.pageable.pageNumber,
        totalElements: data.totalElements,
      },
    };
  };

  const create = async (entity: Product) => {
    const { data } = await axiosLocal.post<Product>('/products', entity);

    return { data };
  };

  const update = async (id: string, entity: Product) => {
    const { data } = await axiosLocal.put<Product>(`/products/${id}`, entity);

    return { data };
  };

  const remove = async (id: string) => {
    const { data } = await axiosLocal.delete<Product>(`/products/${id}`);

    return { data };
  };

  return { list, create, update, remove };
};
