import { Comment } from '@examples/interfaces';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';

export const createRandomComment = (opts: {
  data: Partial<Comment>;
}): Comment => {
  const { videoId } = opts.data;
  return {
    id: uuid(),
    content: faker.lorem.words({ min: 1, max: 2 }),
    videoId: videoId || '',
  };
};
