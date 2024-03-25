import { Pagination, PaginationParams } from 'react-redux-use-model';
import { ListResponse, Video } from '@examples/interfaces';
import { axiosLocal } from '@examples/utils';

export const useVideoApiClient = () => {
  const list = async (
    params: PaginationParams
  ): Promise<{
    data: Video[];
    pagination: Pagination;
  }> => {
    const { data } = await axiosLocal.get<ListResponse<Video>>('/videos', {
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

  const create = async (entity: Video) => {
    const { data } = await axiosLocal.post<Video>('/videos', entity);

    return { data };
  };

  const update = async (id: string, entity: Video) => {
    const { data } = await axiosLocal.put<Video>(`/videos/${id}`, entity);

    return { data };
  };

  const read = async (id: string) => {
    const { data } = await axiosLocal.put<Video>(`/videos/${id}`);

    return { data };
  };

  const remove = async (id: string) => {
    const { data } = await axiosLocal.delete<Video>(`/videos/${id}`);

    return { data };
  };

  return { list, create, update, read, remove };
};
