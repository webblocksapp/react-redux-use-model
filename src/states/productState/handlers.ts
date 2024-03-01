import { Product, ProductState } from '@interfaces';
import { getArrayIds, mergeUniqueIds, normalizeArray } from '@utils';

export const list = (
  products: Product[],
  state: ProductState
): ProductState => {
  return {
    byId: { ...state.byId, ...normalizeArray(products) },
    allIds: mergeUniqueIds(state.allIds, getArrayIds(products)),
  };
};
