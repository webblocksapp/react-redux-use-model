import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';
import { createRandomProduct } from '@examples/mocks';

export const ProductCrud: React.FC = () => {
  const productModel = useProductModel({
    queryKey: QueryKey.ProductCrud,
  });
  const productQuery = useSelector(productModel.selectPaginatedQuery);

  const create = () => {
    productModel.create(createRandomProduct());
  };

  useEffect(() => {
    productModel.list();
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
            {productQuery?.ids?.map((id) => (
              <ProductItem key={id} productId={id} showUpdateBtn />
            ))}
          </div>
          <Paginator
            pagination={productQuery?.queryData?.pagination}
            onClickPage={(index) => productModel.list({ _page: index })}
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
