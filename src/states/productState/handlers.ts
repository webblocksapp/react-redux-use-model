import { Product, ProductState } from '@interfaces';
import {
  getArrayIds,
  mergeQueries,
  mergeUniqueIds,
  normalizeArray,
} from '@utils';

export const list = (
  products: Product[],
  componentId: string | undefined,
  state: ProductState
): ProductState => {
  return {
    ...state,
    byId: { ...state.byId, ...normalizeArray(products) },
    allIds: mergeUniqueIds(state.allIds, getArrayIds(products)),
    queries: mergeQueries(state.queries, componentId, getArrayIds(products)),
  };
};
