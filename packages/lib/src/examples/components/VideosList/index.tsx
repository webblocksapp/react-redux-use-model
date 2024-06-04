import { useVideoModel } from '@examples/models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { VideoItem, Paginator } from '@examples/components';
import { QueryKey } from '@examples/constants';

export interface VideosListProps {}

export const VideosList: React.FC<VideosListProps> = () => {
  const videoModel = useVideoModel();
  const videoQuery = useSelector(videoModel.selectQuery);
  const [params, setParams] = useState({ _page: 0, _size: 10, _filter: '' });

  useEffect(() => {
    videoModel.list({
      queryKey: QueryKey.VideoList,
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
            {videoQuery?.ids?.map((id) => (
              <VideoItem key={id} videoId={id} />
            ))}
          </div>
          <Paginator
            pagination={videoQuery?.pagination}
            onClickPage={(index) =>
              setParams((prev) => ({ ...prev, _page: index }))
            }
          />
          <pre>
            <code>{JSON.stringify(videoQuery?.pagination)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
