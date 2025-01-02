import { describe, expect, it } from "vitest";
import { objectValuesToArray } from "./array";

describe("objectValuesToArray", () => {
  it("objectのvalueの配列を返す", () => {
    const obj = { a: 1, b: 2, c: 3 };

    const result = objectValuesToArray(obj, (value) => value);

    expect(result).toEqual([1, 2, 3]);
  });
});
