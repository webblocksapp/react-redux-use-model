import { Id, Pagination, RootState } from '@interfaces';
import { useProductModel } from '@examples/models';
import { useSelector } from 'react-redux';
import { createRandomProduct } from '@examples/mocks/fakers';

export interface ProductItemProps {
  productId?: Id;
  index: number;
  pagination: Pagination | undefined;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  index,
  pagination,
}) => {
  const productModel = useProductModel();
  const { data: product, loading } = useSelector((state: RootState) =>
    productModel.selectEntity(state, productId)
  );
  const base = (pagination?.size || 0) * (pagination?.page || 0);

  const update = () => {
    productId &&
      productModel.update(productId, {
        ...createRandomProduct(),
        id: productId,
      });
  };

  const remove = () => {
    productId && productModel.remove(productId);
  };

  return (
    <div
      id={String(product?.id)}
      style={{ border: '1px solid black', padding: 5 }}
    >
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
            {index + base + 1}. Name: {product?.name}, Price: {product?.price}
          </div>
          <div>
            <button onClick={update}>
              {productModel.updateState.isLoading ? 'Updating...' : 'Update'}
            </button>
            <button onClick={remove}>
              {productModel.removeState.isLoading ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
