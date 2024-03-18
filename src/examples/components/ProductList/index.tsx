import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';

export const ProductList: React.FC = () => {
  const productModel = useProductModel({
    queryKey: QueryKey.ProductList,
  });
  const productQuery = useSelector(productModel.selectQuery);

  useEffect(() => {
    productModel.list({ _page: 0, _size: 10 });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <div
            style={{
              border: '1px solid black',
              overflow: 'auto',
              width: 300,
              height: 600,
              padding: 10,
            }}
          >
            {productQuery?.ids?.map((id) => (
              <ProductItem key={id} productId={id} />
            ))}
          </div>
          <Paginator
            pagination={productQuery?.pagination}
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
