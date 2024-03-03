export type StateQuery<TQueryData = any> = {
  componentId: string;
  ids: Array<string>;
  queryData?: TQueryData;
};
