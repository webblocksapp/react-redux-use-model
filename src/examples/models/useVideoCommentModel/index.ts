import { EntityActionType } from '@constants';
import { useVideoCommentApiClient } from '@examples/apiClients';
import { EntityName } from '@examples/constants';
import { useModel } from '@hooks';

export const useVideoCommentModel = (options?: { queryKey?: string }) => {
  const videoCommentApiClient = useVideoCommentApiClient();

  const model = useModel({
    entityName: EntityName.VideosComments,
    schema: {
      foreignKeys: [
        {
          foreignKeyName: 'videoId',
          foreignEntityName: EntityName.Videos,
          foreignFieldName: 'comments',
        },
      ],
    },
    queryKey: options?.queryKey,
    handlers: {
      list: {
        action: EntityActionType.LIST,
        apiFn: videoCommentApiClient.list,
      },
      create: {
        action: EntityActionType.CREATE,
        apiFn: videoCommentApiClient.create,
      },
      update: {
        action: EntityActionType.UPDATE,
        apiFn: videoCommentApiClient.update,
      },
      remove: {
        action: EntityActionType.REMOVE,
        apiFn: videoCommentApiClient.remove,
      },
    },
  });

  return model;
};
