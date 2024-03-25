import { useVideoCommentApiClient } from '@examples/apiClients';
import { EntityName } from '@examples/constants';
import { VideoComment } from '@examples/interfaces';
import {
  CrudQueryHandlers,
  EntityActionType,
  useModel,
} from 'react-redux-use-model';

export const useVideoCommentModel = () => {
  const videoCommentApiClient = useVideoCommentApiClient();

  const model = useModel<VideoComment, CrudQueryHandlers<VideoComment>>({
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
      read: {
        action: EntityActionType.READ,
        apiFn: videoCommentApiClient.read,
      },
      remove: {
        action: EntityActionType.REMOVE,
        apiFn: videoCommentApiClient.remove,
      },
    },
  });

  return model;
};
