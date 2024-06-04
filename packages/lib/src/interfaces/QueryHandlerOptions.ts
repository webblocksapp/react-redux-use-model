import { EntityActionType } from '@constants';
import { ApiClientFn } from '@interfaces';

export type QueryHandlerOptions<TNormalizedEntity> = {
  entityName: string;
  queryKey: string | undefined;
} & {
  apiClientFn: ApiClientFn<Array<TNormalizedEntity>, TNormalizedEntity>;
  action: EntityActionType.LIST;
};
