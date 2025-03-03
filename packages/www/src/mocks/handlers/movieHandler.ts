import { BASE_LOCAL_URL } from '@utils/axiosLocal';
import { objectMatchCriteria } from '@utils/objectMatchCriteria';
import { paginateData } from '@utils/paginateData';
import { HttpResponse, delay, http } from 'msw';
import { data } from '../data';
import { v4 as uuid } from 'uuid';
import { Movie } from '@interfaces/Movie'; // Import your Movie interface

export const movieHandler = [
  // List
  http.get(`${BASE_LOCAL_URL}/movies`, async ({ request }) => {
    const url = new URL(request.url);
    const size: any = url.searchParams.get('_size');
    const page: any = url.searchParams.get('_page');
    const filter: any = url.searchParams.get('_filter');
    let movies = data.movies;

    if (filter) {
      movies = movies.filter((item) => objectMatchCriteria(item, filter));
    }

    const { content, totalPages } = paginateData(movies, {
      limit: size,
      page,
    });

    await delay(200);

    return HttpResponse.json(
      {
        data: content,
        pagination: {
          size,
          page,
          totalElements: movies.length,
          totalPages,
        },
      },
      { status: 200 }
    );
  }),
  // Create
  http.post(`${BASE_LOCAL_URL}/movies`, async ({ request }) => {
    const movie = (await request.json()) as Movie;
    const body = { id: uuid(), ...movie };
    data.movies.push(body);
    await delay(2000);
    return HttpResponse.json(body, { status: 200 });
  }),
  // Read
  http.get(`${BASE_LOCAL_URL}/movies/:id`, async ({ params }) => {
    const { id } = params;
    const movie = data.movies.find((item) => item.id === id);
    const notFoundResponse = {
      status: 'NOT_FOUND',
      message: 'No entity(ies) found',
      debugMessage: `No movie was found with id {${id}}.`,
    };

    await delay(200);

    return HttpResponse.json(movie ? movie : notFoundResponse, {
      status: movie ? 200 : 404,
    });
  }),
  // Update
  http.put(`${BASE_LOCAL_URL}/movies/:id`, async ({ request, params }) => {
    const { id } = params;
    let updatedMovie = data.movies.find((item) => item.id === id) as Movie;

    if (updatedMovie) {
      updatedMovie = {
        ...updatedMovie,
        ...((await request.json()) as Movie),
      };
      data.movies = data.movies.map((item) =>
        item.id === id ? updatedMovie : item
      );
      await delay(2000);
      return HttpResponse.json(updatedMovie, { status: 200 });
    }

    return HttpResponse.json({ message: 'Movie not found' }, { status: 404 });
  }),
  // Remove
  http.delete(`${BASE_LOCAL_URL}/movies/:id`, async ({ params }) => {
    const { id } = params;
    const movie = data.movies.find((item) => item.id === id);
    await delay(2000);

    if (movie) {
      data.movies = data.movies.filter((item) => item.id !== id);
      return HttpResponse.json(movie, { status: 200 });
    }

    return HttpResponse.json({ message: 'Movie not found' }, { status: 404 });
  }),
];
