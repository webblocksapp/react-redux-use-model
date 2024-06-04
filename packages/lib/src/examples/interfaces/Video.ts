import { VideoComment } from '@examples/interfaces';

export type Video = {
  id: string;
  title: string;
  comments: Array<VideoComment>;
};
