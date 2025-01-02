export const objectValuesToArray = <T, U>(obj: Record<string, T>, fn: (value: T) => U): U[] => {
  return Object.values(obj).map((value) => {
    return fn(value);
  });
};
