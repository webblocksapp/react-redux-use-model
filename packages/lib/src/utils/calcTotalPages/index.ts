import { calcPageSize } from '@utils';

export const calcTotalPages = (args: {
  totalElements: number;
  size: number;
  sizeMultiplier?: number;
}) => {
  const { totalElements, size, sizeMultiplier } = args;
  return Math.ceil(totalElements / calcPageSize({ size, sizeMultiplier }));
};
