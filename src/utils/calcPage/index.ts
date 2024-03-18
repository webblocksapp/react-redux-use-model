import { calcPageSize } from '@utils';

// Util function to calc page with size multiplier.
export const calcPage = (args: {
  page: number;
  size: number;
  sizeMultiplier?: number;
}) => {
  const { page, size, sizeMultiplier } = args;
  const calculatedPage = Math.floor(
    (page * size) / calcPageSize({ size, sizeMultiplier })
  );
  return calculatedPage < 0 ? 0 : calculatedPage;
};
