import { ComponentId } from '@constants';
import { useProductModel } from '@models';
import { useEffect } from 'react';

export interface ProductListProps {
  id?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  id = ComponentId.ProductList,
}) => {
  const productModel = useProductModel({
    componentId: id,
  });

  useEffect(() => {
    productModel.list();
  }, []);

  return <>Hello World</>;
};
