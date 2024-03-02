import { Product, ProductState, StateQueryParams } from '@interfaces';
import {
  getArrayIds,
  mergeQueries,
  mergeUniqueIds,
  normalizeArray,
} from '@utils';

export const list = (
  products: Product[],
  stateQueryParams: StateQueryParams | undefined,
  state: ProductState
): ProductState => {
  console.log('====>', state.queries, stateQueryParams);
  return {
    ...state,
    byId: { ...state.byId, ...normalizeArray(products) },
    allIds: mergeUniqueIds(state.allIds, getArrayIds(products)),
    queries: mergeQueries(
      state.queries,
      stateQueryParams,
      getArrayIds(products)
    ),
  };
};
