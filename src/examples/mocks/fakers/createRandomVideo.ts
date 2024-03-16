import { Video } from '@examples/interfaces';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { createRandomComment } from '@examples/mocks/fakers';

export const createRandomVideo = (): Video => {
  const videoId = uuid();
  const comments = Array(faker.number.int({ min: 2, max: 4 }))
    .fill(null)
    .map(() => createRandomComment({ data: { videoId } }));

  return {
    id: uuid(),
    title: faker.lorem.words({ min: 1, max: 2 }),
    comments,
  };
};
