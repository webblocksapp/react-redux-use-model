import { EntityActionType as ActionType } from '@constants';

export type EntityAction<
  TEntity extends { id: string } = any,
  TQueryData = any
> = {
  type: ActionType.LIST;
  entityName: string;
  entities: TEntity[];
  queryKey: string | undefined;
  queryData?: TQueryData;
};
