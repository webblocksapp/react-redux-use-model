import { RootState } from '@interfaces';
import { useProductModel } from '@models';
import { useSelector } from 'react-redux';

export interface ProductItemProps {
  productId: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({ productId }) => {
  const { selectProduct } = useProductModel();
  const product = useSelector((state: RootState) =>
    selectProduct(state, productId)
  );

  return (
    <div id={product.id} style={{ border: '1px solid black', padding: 5 }}>
      Name: {product.name}, Price: {product.price}
    </div>
  );
};
