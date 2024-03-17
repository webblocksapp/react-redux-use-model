import { QueryKey } from '@examples/constants';
import { useVideoModel } from '@examples/models';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VideoItem, Paginator } from '@examples/components';

export interface VideosListProps {}

export const VideosList: React.FC<VideosListProps> = () => {
  const videoModel = useVideoModel({ queryKey: QueryKey.VideoList });
  const videoQuery = useSelector(videoModel.selectQuery);

  useEffect(() => {
    videoModel.list();
  }, []);

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
            onClickPage={(index) => videoModel.list({ _page: index })}
          />
          <pre>
            <code>{JSON.stringify(videoQuery?.pagination)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};