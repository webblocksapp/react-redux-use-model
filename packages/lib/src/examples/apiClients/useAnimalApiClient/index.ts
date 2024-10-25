import { Pagination, PaginationParams } from 'react-redux-use-model';
import { ListResponse, Animal } from '@examples/interfaces';
import { axiosLocal } from '@examples/utils';

export const useAnimalApiClient = () => {
  const list = async (
    params: PaginationParams
  ): Promise<{
    data: Animal[];
    pagination: Pagination;
  }> => {
    const { data } = await axiosLocal.get<ListResponse<Animal>>('/animals', {
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

  const create = async (entity: Animal) => {
    const { data } = await axiosLocal.post<Animal>('/animals', entity);

    return { data };
  };

  const update = async (id: string, entity: Animal) => {
    const { data } = await axiosLocal.put<Animal>(`/animals/${id}`, entity);

    return { data };
  };

  const read = async (id: string) => {
    const { data } = await axiosLocal.get<Animal>(`/animals/${id}`);

    return { data };
  };

  const remove = async (id: string) => {
    const { data } = await axiosLocal.delete<Animal>(`/animals/${id}`);

    return { data };
  };

  return { list, create, update, read, remove };
};
