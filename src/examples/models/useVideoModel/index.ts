import { EntityActionType } from '@constants';
import { useVideoApiClient } from '@examples/apiClients';
import { EntityName } from '@examples/constants';
import { useModel } from '@hooks';

export const useVideoModel = (options: { queryKey?: string }) => {
  const videoApiClient = useVideoApiClient();

  const model = useModel({
    entityName: EntityName.Videos,
    queryKey: options.queryKey,
    handlers: {
      list: { action: EntityActionType.LIST, apiFn: videoApiClient.list },
      create: { action: EntityActionType.CREATE, apiFn: videoApiClient.create },
      update: { action: EntityActionType.UPDATE, apiFn: videoApiClient.update },
      remove: { action: EntityActionType.REMOVE, apiFn: videoApiClient.remove },
    },
  });

  return model;
};
