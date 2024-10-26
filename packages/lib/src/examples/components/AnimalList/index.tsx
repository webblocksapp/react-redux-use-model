import { QueryKey } from '@examples/constants';
import { useAnimalModel } from '@examples/models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paginator, AnimalItem } from '@examples/components';
import { PaginationParams } from '@interfaces';

export const AnimalList: React.FC = () => {
  const animalModel = useAnimalModel();
  const animalQuery = useSelector(animalModel.selectQuery);
  const [params, setParams] = useState<PaginationParams>({
    _page: 0,
    _size: 10,
  });

  useEffect(() => {
    if (params._filter) {
      animalModel.list({
        queryKey: QueryKey.FilteredAnimalList,
        paginationParams: params,
        invalidateQuery: { strategy: 'onFilterChange' },
      });
    } else {
      animalModel.list({
        queryKey: QueryKey.AnimalList,
        paginationParams: params,
      });
    }
  }, [params]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <h5>Animals list sort descendant with numeric ids</h5>
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
            {animalQuery?.ids?.map((id) => (
              <AnimalItem key={id} animalId={id} />
            ))}
          </div>
          <Paginator
            pagination={animalQuery?.pagination}
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
          <code>{JSON.stringify(animalQuery, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
