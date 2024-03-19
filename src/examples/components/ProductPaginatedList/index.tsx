import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';

const PAGINATION_PARAMS = { _page: 0, _size: 10 };

export const ProductPaginatedList: React.FC = () => {
  const productModel = useProductModel({
    queryKey: QueryKey.ProductPaginatedList,
  });
  const productQuery = useSelector(productModel.selectPaginatedQuery);

  useEffect(() => {
    productModel.list(PAGINATION_PARAMS);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            border: '1px solid black',
            overflow: 'auto',
            width: 500,
            height: 600,
            padding: 10,
          }}
        >
          <div>
            {productQuery?.ids?.map((id, index) => (
              <ProductItem key={id} index={index} productId={id} />
            ))}
          </div>
          <Paginator
            pagination={productQuery?.pagination}
            onClickPage={(index) =>
              productModel.list({ ...PAGINATION_PARAMS, _page: index })
            }
          />
          <pre>
            <code>{JSON.stringify(productQuery?.pagination)}</code>
          </pre>
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
