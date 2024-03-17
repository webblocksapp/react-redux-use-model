export const calcTotalPages = (args: {
  totalElements: number;
  size: number;
}) => {
  const { totalElements, size } = args;
  return Math.ceil(totalElements / size);
};
