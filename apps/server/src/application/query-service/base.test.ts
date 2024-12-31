import { describe, expect, it } from "vitest";
import { BasePaginationQueryServiceDto, BasePaginationQueryServiceInput } from "./base";

class ChildInput extends BasePaginationQueryServiceInput {}
class ChildDto extends BasePaginationQueryServiceDto {}

describe("BasePaginationQueryServiceInput", () => {
  describe("getSkip", () => {
    it("skipを返す", () => {
      const limit = 10;
      const page = 2;
      const input = new ChildInput(limit, page);

      expect(input.getSkip()).toBe(10);
    });
  });

  describe("getTake", () => {
    it("takeを返す", () => {
      const limit = 15;
      const page = 3;
      const input = new ChildInput(limit, page);

      expect(input.getTake()).toBe(15);
    });
  });
});

describe("BasePaginationQueryServiceDto", () => {
  describe("constructor", () => {
    it("currentPage, totalCount, totalPageを設定する", () => {
      const limit = 10;
      const page = 2;
      const totalCount = 50;

      const input = new ChildInput(limit, page);
      const dto = new ChildDto(input, totalCount);

      expect(dto.currentPage).toBe(2);
      expect(dto.totalCount).toBe(50);
      expect(dto.totalPage).toBe(5);
    });
  });
});
