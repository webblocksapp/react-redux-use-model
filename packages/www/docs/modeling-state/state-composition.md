---
sidebar_position: 1
---

# State Composition

To understand how **react-redux-use-model** works, it is essential to comprehend the components that this library manages within the state.

There are mainly two components:

- **API Client**: Responsible for making requests to the server to fetch information from the backend and perform CRUD operations.
- **Model**: Responsible for orchestrating the request with the server and the Redux store to keep the information normalized in memory.

# Simple State Modeling

A simple way to model the state is through the name of the API or service. For example, if we have an API responsible for managing the products of an e-commerce platform, the ideal name for this model would be `Product`. From there, we will define the model and the api client, resulting in the following:

- Product service at `https://my-ecommerce.com/products`:

  - `useProductApiClient`
  - `useProductModel`

Following this convention, for other possible web services that an e-commerce platform may have, such as:

- Invoice service at `https://my-ecommerce.com/invoices`:

  - `useInvoiceApiClient`
  - `useInvoiceModel`

- Product comments service at `https://my-ecommerce.com/products-comments`:
  - `useProductCommentApiClient`
  - `useProductCommentModel`

Note that the definition of these components is done through hooks, following the convention of `use{{EntityName}}ApiClient` and `use{{EntityName}}Model`, where the `{{EntityName}}` name is deduced from the web service being modeled. It's worth noting that the entity name is defined in singular form, similar to the definition of a model in the backend.
