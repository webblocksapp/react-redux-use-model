import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';
import { PaginationParams } from '@interfaces';

export const ProductList: React.FC = () => {
  const productModel = useProductModel();
  const productQuery = useSelector(productModel.selectQuery);
  const [params, setParams] = useState<PaginationParams>({
    _page: 0,
    _size: 10,
  });

  useEffect(() => {
    productModel.setQueryKey(QueryKey.ProductList);
    if (params._filter) {
      productModel.list({
        queryKey: QueryKey.FilteredProductList,
        paginationParams: params,
        invalidateQuery: { strategy: 'onFilterChange' },
      });
    } else {
      productModel.list({
        queryKey: QueryKey.ProductList,
        paginationParams: params,
      });
    }
  }, [params]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <input
            placeholder="Search..."
            onChange={(event) =>
              setParams((prev) => ({ ...prev, _filter: event.target.value }))
            }
          />
          <div
            style={{
              border: '1px solid black',
              overflow: 'auto',
              width: 300,
              height: 600,
              padding: 10,
            }}
          >
            {productQuery?.ids?.map((id, index) => (
              <ProductItem key={id} index={index} productId={id} />
            ))}
          </div>
          <Paginator
            pagination={productQuery?.pagination}
            onClickPage={(index) =>
              setParams((prev) => ({ ...prev, _page: index }))
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
