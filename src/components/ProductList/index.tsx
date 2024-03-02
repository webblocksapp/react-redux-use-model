import { ComponentName } from '@constants';
import { useProductModel } from '@models';
import { useEffect } from 'react';

export const ProductList = () => {
  const productModel = useProductModel({
    stateQueryParams: { componentName: ComponentName.ProductList },
  });

  useEffect(() => {
    productModel.list();
  }, []);

  return <>Hello World</>;
};
