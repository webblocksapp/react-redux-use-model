import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';
import { createRandomProduct } from '@examples/mocks';

export const ProductCrud: React.FC = () => {
  const productModel = useProductModel();
  const productQuery = useSelector(productModel.selectPaginatedQuery);
  const [params, setParams] = useState({ _page: 0, _size: 10, _filter: '' });

  const create = () => {
    productModel.create(createRandomProduct());
  };

  useEffect(() => {
    productModel.list({
      queryKey: QueryKey.ProductCrud,
      paginationParams: params,
    });
  }, [params]);

  return (
    <div>
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
              setParams((prev) => ({ ...prev, _page: index }))
            }
          />
          <div>
            <button onClick={create}>Create random product</button>
          </div>
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
