import { ProductActionType as ActionType } from '@constants';
import {
  EntityParams,
  Product,
  ProductAction,
  ProductQueryData,
  RootState,
} from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useProductApiClient } from '@apiClients';
import { useQueryHandler } from '@utils';

export const useProductModel = (options?: { componentId?: string }) => {
  const dispatch = useDispatch<Dispatch<ProductAction>>();
  const productApiClient = useProductApiClient();

  const list = async (params?: EntityParams<Product>) => {
    try {
      const { products, pagination } = await productApiClient.list(params);
      dispatch({
        type: ActionType.LIST,
        componentId: options?.componentId,
        products,
        queryData: { pagination },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const selectProductState = (state: RootState) => state.productState;
  const selectProduct = createSelector(
    [selectProductState, (_: RootState, id: string) => id],
    (productState, id) => productState.byId[id]
  );
  const queryHandler = useQueryHandler<ProductQueryData>({
    componentId: options?.componentId,
    stateSelector: selectProductState,
  });

  return { list, selectProductState, selectProduct, queryHandler };
};
