import { RootState } from '@interfaces';
import { useProductModel } from '@examples/models';
import { useSelector } from 'react-redux';
import { createRandomProduct } from '@examples/mocks/fakers';

export interface ProductItemProps {
  productId?: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({ productId }) => {
  const productModel = useProductModel();
  const { entity: product, loading } = useSelector((state: RootState) =>
    productModel.selectEntity(state, productId)
  );

  const update = (id: string) => {
    productModel.update(id, { ...createRandomProduct(), id });
  };

  const updateOptimistic = (id: string) => {
    productModel.updateOptimistic(id, { ...createRandomProduct(), id });
  };

  return (
    <div id={product?.id} style={{ border: '1px solid black', padding: 5 }}>
      {loading ? (
        <>Loading...</>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            Name: {product?.name}, Price: {product?.price}
          </div>
          <div>
            <button
              onClick={() => {
                productId && update(productId);
              }}
            >
              {productModel.updateState.isLoading ? 'Updating...' : 'Update'}
            </button>
            <button
              onClick={() => {
                productId && updateOptimistic(productId);
              }}
            >
              Opt. Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
