export const parseInt = (num: any): number | undefined => {
  const value = Number(num);

  if (isNaN(value)) return;

  return value;
};
