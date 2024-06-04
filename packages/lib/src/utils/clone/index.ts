import { AnyObject } from '@interfaces';

export const clone = <T extends Array<any> | AnyObject>(data: T) =>
  JSON.parse(JSON.stringify(data));
