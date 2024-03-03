import { QueryKey } from '@examples/constants';
import { useProductModel } from '@examples/models';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, ProductItem } from '@examples/components';

export const ProductList: React.FC = () => {
  const productModel = useProductModel({
    queryKey: QueryKey.ProductList,
  });
  const { queryHandler, list } = productModel;
  const productQuery = useSelector(queryHandler.selectQuery);

  useEffect(() => {
    list();
  }, []);

  return (
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
        pagination={productQuery?.queryData?.pagination}
        onClickPage={(index) => list({ _page: index })}
      />
      <pre>
        <code>{JSON.stringify(productQuery?.ids, null, 2)}</code>
      </pre>
    </div>
  );
};
