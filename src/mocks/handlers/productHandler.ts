import { BASE_URL, paginateData } from '@utils';
import { http, delay, HttpResponse } from 'msw';
import { data } from '@mocks/data';

export const productHandler = [
  // List
  http.get(`${BASE_URL}/products`, async ({ request }) => {
    const url = new URL(request.url);
    const size: any = url.searchParams.get('_size');
    const page: any = url.searchParams.get('_page');
    const products = data.products;

    const { content, totalPages } = paginateData(products, {
      limit: size,
      page,
    });

    await delay(2000);

    return HttpResponse.json(
      {
        totalElements: products.length,
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
];
