import { ProductActionType as ActionType } from '@constants';
import { ProductAction } from '@interfaces';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useProductApiClient } from '@apiClients';

export const useProductModel = () => {
  const dispatch = useDispatch<Dispatch<ProductAction>>();
  const productApiClient = useProductApiClient();

  const list = async () => {
    try {
      dispatch({
        type: ActionType.LIST,
        products: await productApiClient.list(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { list };
};
