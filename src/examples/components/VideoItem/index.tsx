import { createRandomVideo } from '@examples/mocks';
import { useVideoModel } from '@examples/models';
import { RootState } from '@interfaces';
import { useSelector } from 'react-redux';
import { VideoCommentsList } from '@examples/components';

export interface VideoItemProps {
  videoId: string;
}

export const VideoItem: React.FC<VideoItemProps> = ({ videoId }) => {
  const videoModel = useVideoModel();
  const { entity: video, loading } = useSelector((state: RootState) =>
    videoModel.selectEntity(state, videoId)
  );

  const update = () => {
    videoId &&
      videoModel.update(videoId, {
        ...createRandomVideo(),
        id: videoId,
      });
  };

  const remove = () => {
    videoId && videoModel.remove(videoId);
  };

  return (
    <div id={video?.id} style={{ border: '1px solid black', padding: 5 }}>
      {loading ? (
        <>Loading...</>
      ) : (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>Title: {video?.title}</div>
            <div>
              <button onClick={update}>
                {videoModel.updateState.isLoading ? 'Updating...' : 'Update'}
              </button>
              <button onClick={remove}>
                {videoModel.removeState.isLoading ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
          {video?.comments ? (
            <VideoCommentsList commentsIds={video.comments} />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
