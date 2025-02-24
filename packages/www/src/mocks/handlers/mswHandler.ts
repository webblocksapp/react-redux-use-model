import { BASE_LOCAL_URL } from '@utils/axiosLocal';

import { HttpResponse, http } from 'msw';

export const mswHandler = [
  http.get(`${BASE_LOCAL_URL}/msw`, async () => {
    return HttpResponse.json(
      {
        now: new Date().getTime(),
      },
      { status: 200 }
    );
  }),
];
