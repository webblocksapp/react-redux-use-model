import { EntityActionType } from '@constants';
import { ApiClientFn, EntityParams } from '@interfaces';

export type QueryHandlerOptions<TNormalizedEntity> = {
  entityName: string;
  queryKey: string | undefined;
} & {
  apiClientFn: ApiClientFn<
    Array<TNormalizedEntity>,
    EntityParams<TNormalizedEntity>
  >;
  action: EntityActionType.LIST;
};
