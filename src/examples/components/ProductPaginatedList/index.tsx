import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';
import { useDebounce, withQueryKey } from 'react-redux-use-model';

export const ProductPaginatedList: React.FC = withQueryKey(() => {
  const [params, setParams] = useState({ _page: 0, _size: 10, _filter: '' });
  const productModel = useProductModel();
  const productQuery = useSelector(productModel.selectPaginatedQuery);

  const search = useDebounce((criteria: string) => {
    setParams({
      _page: 0,
      _size: 10,
      _filter: criteria,
    });
  });

  useEffect(() => {
    productModel.setQueryKey(
      params._filter
        ? QueryKey.ProductPaginatedFilteredList
        : QueryKey.ProductPaginatedList
    );
    productModel.list(params);
  }, [params._filter]);

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(event) => search(event.target.value)}
      />
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
              productModel.list({ ...params, _page: index })
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
});
