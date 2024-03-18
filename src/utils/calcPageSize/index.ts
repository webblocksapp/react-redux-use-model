export const calcPageSize = (args: {
  size: number;
  sizeMultiplier?: number;
}) => {
  let { size, sizeMultiplier = 1 } = args;
  if (sizeMultiplier < 1) sizeMultiplier = 1;
  return size * sizeMultiplier;
};
