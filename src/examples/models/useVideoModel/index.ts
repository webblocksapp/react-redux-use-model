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
      remove: { action: EntityActionType.REMOVE, apiFn: videoApiClient.remove },
    },
  });

  return model;
};
