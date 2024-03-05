import { RootState } from '@interfaces';
import { useProductModel } from '@examples/models';
import { useSelector } from 'react-redux';

export interface ProductItemProps {
  productId?: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({ productId }) => {
  const productModel = useProductModel();
  const { entity: product, loading } = useSelector((state: RootState) =>
    productModel.selectEntity(state, productId)
  );

  return (
    <div id={product?.id} style={{ border: '1px solid black', padding: 5 }}>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          Name: {product?.name}, Price: {product?.price}
        </>
      )}
    </div>
  );
};
