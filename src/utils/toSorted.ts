export const toSorted = <T>(xs: T[], compareFn: (a: T, b: T) => number): T[] => {
  const cp = [...xs];
  cp.sort(compareFn);
  return cp;
};
