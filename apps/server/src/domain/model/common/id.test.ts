import { AppError, StatusCode } from "@/core/error";
import { faker } from "@faker-js/faker";
import { err, ok } from "neverthrow";
import { describe, expect, it } from "vitest";
import { Id } from "./id";

class ChildId extends Id {}

describe("Id", () => {
  describe("toString", () => {
    it("valueを返す", () => {
      const value = faker.string.uuid();
      const id = new ChildId(value);
      expect(id.toString()).toEqual(ok(value));
    });

    it("エラーを返す", () => {
      const id = new ChildId(null);
      expect(id.toString()).toEqual(
        err(new AppError(StatusCode.InternalServerError, "Id is null")),
      );
    });
  });
});
