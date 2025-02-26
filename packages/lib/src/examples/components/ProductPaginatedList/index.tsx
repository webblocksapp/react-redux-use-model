import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Pagination, ProductItem } from '@examples/components';
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
    if (params._filter) {
      productModel.list({
        queryKey: QueryKey.ProductPaginatedFilteredList,
        paginationParams: params,
        invalidateQuery: { strategy: 'onFilterChange' },
      });
    } else {
      productModel.list({
        queryKey: QueryKey.ProductPaginatedList,
        paginationParams: params,
      });
    }
  }, [params]);

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
          <Pagination
            page={productQuery?.pagination?.page}
            count={productQuery?.pagination?.totalPages}
            onChange={async (page) =>
              setParams((prev) => ({ ...prev, _page: page }))
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
