import { EntityActionType } from '@constants';
import { useVideoApiClient } from '@examples/apiClients';
import { EntityName } from '@examples/constants';
import { Video } from '@examples/interfaces';
import { useModel } from '@hooks';
import { CrudQueryHandlers } from 'react-redux-use-model';

export const useVideoModel = () => {
  const videoApiClient = useVideoApiClient();

  const model = useModel<Video, CrudQueryHandlers<Video>>({
    entityName: EntityName.Videos,
    schema: {
      relationships: [
        { fieldName: 'comments', entityName: EntityName.VideosComments },
      ],
    },
    handlers: {
      list: {
        action: EntityActionType.LIST,
        apiFn: videoApiClient.list,
      },
      create: {
        action: EntityActionType.CREATE,
        apiFn: videoApiClient.create,
      },
      update: { action: EntityActionType.UPDATE, apiFn: videoApiClient.update },
      read: { action: EntityActionType.READ, apiFn: videoApiClient.read },
      remove: { action: EntityActionType.REMOVE, apiFn: videoApiClient.remove },
    },
  });

  return model;
};
