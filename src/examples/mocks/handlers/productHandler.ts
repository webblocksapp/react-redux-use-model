import { BASE_URL } from '@examples/utils';
import { paginateData } from '@utils';
import { http, delay, HttpResponse } from 'msw';
import { data } from '@examples/mocks/data';
import { Product } from '@examples/interfaces';

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
  http.post(`${BASE_URL}/products`, async ({ request }) => {
    const product = (await request.json()) as Product;
    data.products.push(product);
    return HttpResponse.json(product, { status: 200 });
  }),
];
