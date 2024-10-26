import { BASE_URL, objectMatchCriteria } from '@examples/utils';
import { paginateData } from '@utils';
import { http, delay, HttpResponse } from 'msw';
import { data } from '@examples/mocks/data';
import { Animal } from '@examples/interfaces';

export const animalHandler = [
  // List
  http.get(`${BASE_URL}/animals`, async ({ request }) => {
    const url = new URL(request.url);
    const size: any = url.searchParams.get('_size');
    const page: any = url.searchParams.get('_page');
    const filter: any = url.searchParams.get('_filter');
    let animals = data.animals.sort((a, b) => b.id - a.id);

    if (filter) {
      animals = animals.filter((item) =>
        objectMatchCriteria(item, filter, ['name'])
      );
    }

    const { content, totalPages } = paginateData(animals, {
      limit: size,
      page,
    });

    await delay(2000);

    return HttpResponse.json(
      {
        totalElements: animals.length,
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
  http.post(`${BASE_URL}/animals`, async ({ request }) => {
    const animal = (await request.json()) as Animal;
    data.animals.push(animal);
    await delay(2000);
    return HttpResponse.json(animal, { status: 200 });
  }),
  http.put(`${BASE_URL}/animals/:id`, async ({ request, params }) => {
    const { id } = params;
    const animal = (await request.json()) as Animal;
    data.animals = data.animals.map((item) => {
      if (item.id == Number(id)) {
        return { ...item, ...animal };
      }
      return item;
    });
    await delay(2000);
    return HttpResponse.json(animal, { status: 200 });
  }),
  http.delete(`${BASE_URL}/animals/:id`, async ({ params }) => {
    const { id } = params;
    data.animals = data.animals.filter((item) => item.id != Number(id));
    await delay(2000);
    return HttpResponse.json({ id }, { status: 200 });
  }),
];
