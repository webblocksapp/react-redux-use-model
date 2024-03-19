import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';
import { createRandomProduct } from '@examples/mocks';

const PAGINATION_PARAMS = { _page: 0, _size: 10 };

export const ProductCrud: React.FC = () => {
  const productModel = useProductModel({
    queryKey: QueryKey.ProductCrud,
  });
  const productQuery = useSelector(productModel.selectPaginatedQuery);

  const create = () => {
    productModel.create(createRandomProduct());
  };

  useEffect(() => {
    productModel.list(PAGINATION_PARAMS);
  }, []);

  return (
    <div>
      <div>
        <button onClick={create}>Create random product</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <div
            style={{
              border: '1px solid black',
              overflow: 'auto',
              width: 500,
              height: 600,
              padding: 10,
            }}
          >
            {productQuery?.ids?.map((id, index) => (
              <ProductItem index={index} key={id} productId={id} />
            ))}
          </div>
          <Paginator
            pagination={productQuery?.pagination}
            onClickPage={(index) =>
              productModel.list({ ...PAGINATION_PARAMS, _page: index })
            }
          />
        </div>
        <pre
          style={{
            border: '1px solid black',
            overflow: 'auto',
            width: 500,
            height: 600,
            padding: 10,
            marginLeft: 20,
          }}
        >
          <code>{JSON.stringify(productQuery, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
