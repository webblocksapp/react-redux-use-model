export type EntityParams<T = any> = {
  _page?: number;
  _size?: number;
  _filter?: string;
} & Partial<T>;
