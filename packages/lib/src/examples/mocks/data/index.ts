import { animals } from './animals';
import { products } from './products';
import { videos } from './videos';

export const data = {
  products: products(20),
  videos: videos(100),
  animals,
};
