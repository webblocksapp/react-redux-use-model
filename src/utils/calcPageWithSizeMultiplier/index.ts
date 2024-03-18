import { calcPageSize } from '@utils';

// Util function to calc page with size multiplier.
export const calcPageWithSizeMultiplier = (args: {
  page: number;
  size: number;
  sizeMultiplier?: number;
  zeroBased?: boolean;
}) => {
  let { page, size, sizeMultiplier, zeroBased = true } = args;
  page = zeroBased ? page + 1 : page;
  let calculatedPage = Math.ceil(
    (page * size) / calcPageSize({ size, sizeMultiplier })
  );
  calculatedPage = zeroBased ? calculatedPage - 1 : calculatedPage;
  return calculatedPage < 0 ? 0 : calculatedPage;
};
