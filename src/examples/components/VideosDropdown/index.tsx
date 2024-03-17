import { QueryKey } from '@examples/constants';
import { useVideoModel } from '@examples/models';
import { Select } from '@examples/components';
import { useSelector } from 'react-redux';
import { RootState } from '@interfaces';
import { useEffect, useState } from 'react';

export const VideosDropdown: React.FC = () => {
  const videoModel = useVideoModel({ queryKey: QueryKey.VideosDropdown });
  const query = useSelector((state: RootState) =>
    videoModel.selectQuery(state)
  );
  const [params, setParams] = useState(query?.params?.[0]);
  const entities = useSelector((state: RootState) =>
    videoModel.selectEntities(state, query.ids)
  );

  const list = () => {
    videoModel.list({ _page: params?._page, _size: 30 });
    setParams((prev) => ({ ...prev, _page: (params?._page || 0) + 1 }));
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <Select
      options={(entities || [])
        .filter((item) => item.loading == false)
        .map((item) => ({
          label: item.entity?.title,
          value: item.entity?.id,
        }))}
      endReached={list}
    />
  );
};
