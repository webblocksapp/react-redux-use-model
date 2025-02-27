import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';
import { PaginationParams, RootState } from '@interfaces';

export const ProductPaginatedEntitiesList: React.FC = () => {
  const [params, setParams] = useState<PaginationParams>({
    _page: 0,
    _size: 10,
  });
  const productModel = useProductModel();
  const productQuery = useSelector(productModel.selectPaginatedQuery);
  const entities = useSelector((state: RootState) =>
    productModel.selectEntities(state, productQuery.ids)
  );

  useEffect(() => {
    productModel.list({
      queryKey: QueryKey.ProductPaginatedEntitiesList,
      paginationParams: params,
    });
  }, [params]);

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
            {entities.map((entity, index) => (
              <ProductItem
                pagination={productQuery.pagination}
                key={entity.id}
                index={index}
                productId={entity.id}
              />
            ))}
          </div>
          <Paginator
            pagination={productQuery?.pagination}
            onClickPage={(index) => {
              setParams((prev) => ({ ...prev, _page: index }));
            }}
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
