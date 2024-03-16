import { EntityParams, Pagination } from '@interfaces';
import { ListResponse, VideoComment } from '@examples/interfaces';
import { axiosLocal } from '@examples/utils';

export const useVideoCommentCommentApiClient = () => {
  const list = async (
    params: EntityParams<VideoComment>
  ): Promise<{
    data: VideoComment[];
    pagination: Pagination;
  }> => {
    const { data } = await axiosLocal.get<ListResponse<VideoComment>>(
      `/videos/${params.videoId}/comments`,
      {
        params: { _size: 10, _page: 0, ...params },
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
