import { QueryKey } from '@examples/constants';
import { useVideoModel } from '@examples/models';
import { Select } from '@examples/components';
import { useSelector } from 'react-redux';
import { RootState } from '@interfaces';
import { useEffect, useState } from 'react';

export const VideosDropdown: React.FC = () => {
  const videoModel = useVideoModel();
  const query = useSelector(videoModel.selectQuery);
  const paginationParams = useSelector(videoModel.selectPaginationParams);
  const [params, setParams] = useState(paginationParams);
  const entities = useSelector((state: RootState) =>
    videoModel.selectEntities(state, query.ids)
  );

  useEffect(() => {
    videoModel.list({
      queryKey: QueryKey.VideosDropdown,
      paginationParams: params,
    });
  }, [params]);

  return (
    <Select
      options={entities
        .filter((entity) => entity.loading == false)
        .map((entity) => ({
          label: entity.data?.title,
          value: entity.id,
        }))}
      endReached={() => {
        setParams((prev) => ({ ...prev, _page: params._page + 1 }));
      }}
    />
  );
};
