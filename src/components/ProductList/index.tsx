import { ComponentId } from '@constants';
import { useProductModel } from '@models';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProductItem } from '@components';

export interface ProductListProps {
  id?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  id = ComponentId.ProductList,
}) => {
  const productModel = useProductModel({
    componentId: id,
  });
  const { queryHandler, list } = productModel;
  const productQuery = useSelector(queryHandler.selectQuery);

  useEffect(() => {
    list();
  }, []);

  return (
    <div
      style={{
        border: '1px solid black',
        overflow: 'auto',
        width: 300,
        height: 600,
        padding: 10,
      }}
    >
      {productQuery?.ids.map((id) => (
        <ProductItem productId={id} />
      ))}
    </div>
  );
};
