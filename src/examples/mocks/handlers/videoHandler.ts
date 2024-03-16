import { BASE_URL } from '@examples/utils';
import { paginateData } from '@utils';
import { http, delay, HttpResponse } from 'msw';
import { data } from '@examples/mocks/data';
import { Video } from '@examples/interfaces';

export const videoHandler = [
  // List
  http.get(`${BASE_URL}/videos`, async ({ request }) => {
    const url = new URL(request.url);
    const size: any = url.searchParams.get('_size');
    const page: any = url.searchParams.get('_page');
    const videos = data.videos;

    const { content, totalPages } = paginateData(videos, {
      limit: size,
      page,
    });

    await delay(2000);

    return HttpResponse.json(
      {
        totalElements: videos.length,
        totalPages,
        content,
        pageable: {
          offset: 0,
          pageSize: size,
          pageNumber: page,
        },
      },
      { status: 200 }
    );
  }),
  http.post(`${BASE_URL}/videos`, async ({ request }) => {
    const video = (await request.json()) as Video;
    data.videos.push(video);
    await delay(2000);
    return HttpResponse.json(video, { status: 200 });
  }),
  http.put(`${BASE_URL}/videos/:id`, async ({ request, params }) => {
    const { id } = params;
    const video = (await request.json()) as Video;
    data.videos = data.videos.map((item) => {
      if (item.id == id) {
        return { ...item, ...video };
      }
      return item;
    });
    await delay(2000);
    return HttpResponse.json(video, { status: 200 });
  }),
];
