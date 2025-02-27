export const products = (quantity: number) =>
  Array(quantity)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: i + 1,
    }));
