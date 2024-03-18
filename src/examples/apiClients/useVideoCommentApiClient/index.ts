import { Pagination, PaginationParams } from '@interfaces';
import { ListResponse, VideoComment } from '@examples/interfaces';
import { axiosLocal } from '@examples/utils';

export const useVideoCommentApiClient = () => {
  const list = async (
    paginationParams: PaginationParams,
    entity: VideoComment
  ): Promise<{
    data: VideoComment[];
    pagination: Pagination;
  }> => {
    const { data } = await axiosLocal.get<ListResponse<VideoComment>>(
      `/videos/${entity.videoId}/comments`,
      {
        params: { _size: 10, ...paginationParams },
      }
    );
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

  const create = async (entity: VideoComment) => {
    const { data } = await axiosLocal.post<VideoComment>(
      `/videos/${entity.videoId}/comments`,
      entity
    );

    return { data };
  };

  const update = async (id: string, entity: VideoComment) => {
    const { data } = await axiosLocal.put<VideoComment>(
      `/videos/${entity.videoId}/comments/${id}`,
      entity
    );

    return { data };
  };

  const remove = async (id: string, entity: VideoComment) => {
    const { data } = await axiosLocal.delete<VideoComment>(
      `/videos/${entity.videoId}/comments/${id}`
    );

    return { data };
  };

  return { list, create, update, remove };
};
