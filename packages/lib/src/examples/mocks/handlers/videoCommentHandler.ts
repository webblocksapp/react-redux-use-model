import { BASE_URL } from '@examples/utils';
import { paginateData } from '@utils';
import { http, delay, HttpResponse } from 'msw';
import { data } from '@examples/mocks/data';
import { VideoComment } from '@examples/interfaces';

export const videoComment = [
  // List
  http.get(
    `${BASE_URL}/videos/:videoId/comments`,
    async ({ request, params }) => {
      const { videoId } = params;
      const url = new URL(request.url);
      const size: any = url.searchParams.get('_size');
      const page: any = url.searchParams.get('_page');
      const comments =
        data.videos.find((video) => video.id == videoId)?.comments || [];

      const { content, totalPages } = paginateData(comments, {
        limit: size,
        page,
      });

      await delay(2000);

      return HttpResponse.json(
        {
          totalElements: comments.length,
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
    }
  ),
  http.post(
    `${BASE_URL}/videos/:videoId/comments`,
    async ({ request, params }) => {
      const { videoId } = params;
      const videoComment = (await request.json()) as VideoComment;
      data.videos = data.videos.map((video) => {
        if (video.id == videoId) {
          video.comments = [...video.comments, videoComment];
        }
        return video;
      });
      await delay(2000);
      return HttpResponse.json(videoComment, { status: 200 });
    }
  ),
  http.put(
    `${BASE_URL}/videos/:videoId/comments/:commentId`,
    async ({ request, params }) => {
      const { videoId, commentId } = params;
      const videoComment = (await request.json()) as VideoComment;
      data.videos = data.videos.map((video) => {
        if (video.id == videoId) {
          video.comments.map((comment) => {
            if (comment.id == commentId) {
              return { ...comment, ...videoComment };
            }
            return comment;
          });
        }
        return video;
      });
      await delay(2000);
      return HttpResponse.json(videoComment, { status: 200 });
    }
  ),
  http.delete(
    `${BASE_URL}/videos/:videoId/comments/:commentId`,
    async ({ params }) => {
      const { videoId, commentId } = params;
      data.videos = data.videos.map((video) => {
        if (video.id == videoId) {
          video.comments.filter((comment) => comment.id != commentId);
        }
        return video;
      });
      await delay(2000);
      return HttpResponse.json({ id: commentId }, { status: 200 });
    }
  ),
];
