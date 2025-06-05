export const toSorted = <T>(xs: T[], compareFn: (_a: T, _b: T) => number): T[] => {
  const cp = [...xs];
  cp.sort(compareFn);
  return cp;
};
