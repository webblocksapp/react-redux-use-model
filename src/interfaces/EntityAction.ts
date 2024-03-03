import { EntityActionType as ActionType } from '@constants';

export type EntityAction<
  TNormalizedEntity extends { id: string } = any,
  TQueryData = any
> = {
  type: ActionType.LIST;
  entityName: string;
  entities: TNormalizedEntity[];
  queryKey: string | undefined;
  queryData?: TQueryData;
};
