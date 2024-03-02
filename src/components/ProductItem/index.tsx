import { RootState } from '@interfaces';
import { useProductModel } from '@models';
import { useSelector } from 'react-redux';

export interface ProductItemProps {
  productId?: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({ productId }) => {
  const { queryHandler } = useProductModel();
  const { entity: product, loading } = useSelector((state: RootState) =>
    queryHandler.selectEntity(state, productId)
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
