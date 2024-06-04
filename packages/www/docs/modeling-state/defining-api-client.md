---
sidebar_position: 2
---

# Defining an API Client

As mentioned earlier, the API client is the state component that allows us to interact with the server to fetch information and perform CRUD operations.

To structure our state, we will define the API client as a hook whose name is based on the entity being handled:

`use{{EntityName}}ApiClient`

### API Client Hook Constraint

- My entities web service `https://my-awesome-app.com/my-entities`
- `useMyEntityApiClient`

The following is the constraint of an API client. In case the service does not provide all CRUD operations, only implement the methods you need following this constraint. For example, if the web service only allows to list and create, simply implement those two.

```typescript
import { Pagination, PaginationParams } from 'react-redux-use-model';

type MyEntity = {
  id: string;
  // Other props...
};

const useMyEntityApiClient: () => {
  list: (params: PaginationParams) => Promise<{
    data: MyEntity[];
    pagination: Pagination;
  }>;
  create: (entity: MyEntity) => Promise<{
    data: MyEntity;
  }>;
  update: (
    id: string,
    entity: MyEntity
  ) => Promise<{
    data: MyEntity;
  }>;
  read: (id: string) => Promise<{
    data: MyEntity;
  }>;
  remove: (id: string) => Promise<{ data: MyEntity }>;
};
```

### Example with Product Entity

- Products web service `https://my-ecommerce.com/products`
- `useProductApiClient`

```typescript
import { Pagination, PaginationParams } from 'react-redux-use-model';
import { axios } from 'axios';

const BASE_URL = 'https://my-ecommerce.com';

export type ListResponse<T> = {
  totalPages: number;
  totalElements: number;
  content: Array<T>;
  pageable: {
    offset: number;
    pageSize: 0;
    pageNumber: 0;
  };
};

export type Product = {
  id: string;
  name: string;
  price: number;
};

export const useProductApiClient = () => {
  const list = async (
    params: PaginationParams
  ): Promise<{
    data: Product[];
    pagination: Pagination;
  }> => {
    const { data } = await axios.get<ListResponse<Product>>(
      `${BASE_URL}/products`,
      {
        params,
      }
    );
    return {
      data: data.content,
      pagination: {
        totalPages: data.totalPages,
        size: data.pageable.pageSize,
        page: data.pageable.pageNumber,
        totalElements: data.totalElements,
      },
    };
  };

  const create = async (entity: Product) => {
    const { data } = await axios.post<Product>(`${BASE_URL}/products`, entity);

    return { data };
  };

  const update = async (id: string, entity: Product) => {
    const { data } = await axios.put<Product>(
      `${BASE_URL}/products/${id}`,
      entity
    );

    return { data };
  };

  const read = async (id: string) => {
    const { data } = await axios.get<Product>(`${BASE_URL}/products/${id}`);

    return { data };
  };

  const remove = async (id: string) => {
    const { data } = await axios.delete<Product>(`${BASE_URL}/products/${id}`);

    return { data };
  };

  return { list, create, update, read, remove };
};
```
