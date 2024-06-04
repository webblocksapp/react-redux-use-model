import { RootState } from '@interfaces';
import { useSelector } from 'react-redux';
import { useVideoCommentModel } from '@examples/models';
import { createRandomVideoComment } from '@examples/mocks';
import { VideoComment } from '@examples/interfaces';

export interface VideoCommentsListProps {
  commentsIds: string[];
}

export const VideoCommentsList: React.FC<VideoCommentsListProps> = ({
  commentsIds,
}) => {
  const videoCommentModel = useVideoCommentModel();
  const entities = useSelector((state: RootState) =>
    videoCommentModel.selectEntities(state, commentsIds)
  );

  const update = (videoComment?: VideoComment) => {
    videoComment &&
      videoCommentModel.update(videoComment.id, {
        ...createRandomVideoComment({
          data: { videoId: videoComment.videoId },
        }),
        id: videoComment.videoId,
      });
  };

  const remove = (videoComment?: VideoComment) => {
    videoComment && videoCommentModel.remove(videoComment.id, videoComment);
  };

  return (
    <ul>
      {entities.map((entity) => (
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          key={entity.id}
        >
          {entity.loading ? 'Loading comment...' : entity.data?.content}
          <div>
            <button onClick={() => update(entity.data)}>
              {videoCommentModel.updateState.isLoading
                ? 'Updating...'
                : 'Update'}
            </button>
            <button onClick={() => remove(entity.data)}>
              {videoCommentModel.removeState.isLoading
                ? 'Removing...'
                : 'Remove'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
