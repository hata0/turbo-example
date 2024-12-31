export const createRandomSizeArray = <T>(
  { min, max }: { min?: number; max: number },
  fn: () => T,
): T[] => {
  if (max <= 0) {
    throw new Error("max must be greater than 0");
  }
  if (min && min < 0) {
    throw new Error("min must be greater than or equal to 0");
  }

  const length = Math.floor(Math.random() * (max - (min || 0)) + (min || 0));
  return Array.from({ length }, fn);
};

export const objectValuesToArray = <T, U>(obj: Record<string, T>, fn: (value: T) => U): U[] => {
  return Object.values(obj).map((value) => {
    return fn(value);
  });
};
