import { animals } from './animals';
import { products } from './products';
import { videos } from './videos';

export const data = {
  products: products(1000000),
  videos: videos(100),
  animals,
};
