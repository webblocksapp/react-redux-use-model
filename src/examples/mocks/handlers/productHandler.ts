import { BASE_URL, objectMatchCriteria } from '@examples/utils';
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
    const filter: any = url.searchParams.get('_filter');
    let products = data.products;

    if (filter) {
      products = products.filter((item) =>
        objectMatchCriteria(item, filter, ['name'])
      );
    }

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
    await delay(2000);
    return HttpResponse.json(product, { status: 200 });
  }),
  http.put(`${BASE_URL}/products/:id`, async ({ request, params }) => {
    const { id } = params;
    const product = (await request.json()) as Product;
    data.products = data.products.map((item) => {
      if (item.id == id) {
        return { ...item, ...product };
      }
      return item;
    });
    await delay(2000);
    return HttpResponse.json(product, { status: 200 });
  }),
  http.delete(`${BASE_URL}/products/:id`, async ({ params }) => {
    const { id } = params;
    data.products = data.products.filter((item) => item.id != id);
    await delay(2000);
    return HttpResponse.json({ id }, { status: 200 });
  }),
];
