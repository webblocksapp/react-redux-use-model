import { Pagination, PaginationParams } from '@interfaces';
import { ListResponse, Video } from '@examples/interfaces';
import { axiosLocal } from '@examples/utils';

export const useVideoApiClient = () => {
  const list = async (
    paginationParams: PaginationParams
  ): Promise<{
    data: Video[];
    pagination: Pagination;
  }> => {
    const { data } = await axiosLocal.get<ListResponse<Video>>('/videos', {
      params: { _size: 10, ...paginationParams },
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

  const remove = async (id: string) => {
    const { data } = await axiosLocal.delete<Video>(`/videos/${id}`);

    return { data };
  };

  return { list, create, update, remove };
};
