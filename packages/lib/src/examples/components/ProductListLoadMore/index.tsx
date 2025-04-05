import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductItemBasic } from '@examples/components';
import { PaginationParams } from '@interfaces';
import { ListMode } from '@constants';

export const ProductListLoadMore: React.FC = () => {
  const productModel = useProductModel();
  const productQuery = useSelector(productModel.selectQuery);
  const [params, setParams] = useState<PaginationParams>({
    _page: 0,
    _size: 10,
  });

  useEffect(() => {
    productModel.list({
      queryKey: QueryKey.ProductListLoadMore,
      paginationParams: params,
      mode: ListMode.LoadMore,
    });
  }, [params]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <h5>Load More Products</h5>
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
              <ProductItemBasic index={index} productId={id} />
            ))}
          </div>
          {params._page + 1 < (productQuery.pagination?.totalPages || 0) ? (
            <button
              onClick={() =>
                setParams((prev) => ({ ...prev, _page: prev._page + 1 }))
              }
            >
              Load More
            </button>
          ) : (
            <></>
          )}
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
