import { ProductActionType as ActionType } from '@constants';
import {
  EntityParams,
  Product,
  ProductAction,
  StateQueryParams,
  RootState,
} from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useProductApiClient } from '@apiClients';
import { useQuerySelector } from '@utils';

export const useProductModel = (options?: {
  stateQueryParams?: StateQueryParams;
}) => {
  const dispatch = useDispatch<Dispatch<ProductAction>>();
  const productApiClient = useProductApiClient();

  const list = async (params?: EntityParams<Product>) => {
    try {
      const { content: products } = await productApiClient.list(params);
      dispatch({
        type: ActionType.LIST,
        products,
        stateQueryParams: options?.stateQueryParams,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const selectProductState = (state: RootState) => state.productState;
  const selectQueries = createSelector(
    [selectProductState],
    (productState) => productState.queries
  );
  const selectProduct = createSelector(
    [selectProductState, (_: RootState, id: string) => id],
    (productState, id) => productState.byId[id]
  );
  const { selectQuery } = useQuerySelector(selectQueries);

  return { list, selectProductState, selectProduct, selectQuery };
};
