import { AppError, StatusCode } from "@/core/error";
import { Post, PostId } from "@/domain/model/post";
import { createPostMock } from "@/tests/mocks/post";
import { createRandomSizeArray, objectValuesToArray } from "@/utils/array";
import { faker } from "@faker-js/faker";
import { err } from "neverthrow";
import { describe, expect, it } from "vitest";
import {
  ListPostHttpQueryServiceDto,
  ListPostHttpQueryServiceInput,
  ListPostPaginationHttpQueryServiceDto,
  PostSortPattern,
} from "./list";

const createInputMock = () => {
  const limit = faker.number.int({ min: 1, max: 40 });
  const page = faker.number.int({ min: 1, max: 50 });
  const sort = faker.helpers.arrayElement(objectValuesToArray(PostSortPattern, (s) => s));

  return { limit, page, sort };
};

describe("ListPostQueryServiceInput", () => {
  describe("getOrderBy", () => {
    it("適切なソート順のorderByを返す", () => {
      const expectedOrders = {
        [PostSortPattern.Newest]: { createdAt: "desc" },
        [PostSortPattern.Oldest]: { createdAt: "asc" },
      };

      objectValuesToArray(PostSortPattern, (sort) => {
        const { limit, page } = createInputMock();

        const input = new ListPostHttpQueryServiceInput(limit, page, sort);
        const orderBy = input.getOrderBy();

        expect(orderBy).toEqual(expectedOrders[sort]);
      });
    });
  });
});

describe("ListPostQueryServiceDto", () => {
  describe("create", () => {
    const { limit, page, sort } = createInputMock();
    const totalCount = faker.number.int({ min: 2000, max: 5000 });
    const input = new ListPostHttpQueryServiceInput(limit, page, sort);

    const pagination = new ListPostPaginationHttpQueryServiceDto(input, totalCount);

    it("dtoをokとして返す", () => {
      const posts = createRandomSizeArray({ min: 1, max: 10 }, () => {
        const { id, title, body, createdAt, updatedAt } = createPostMock();
        return new Post(id, title, body, createdAt, updatedAt);
      });

      const result = ListPostHttpQueryServiceDto.create(posts, pagination)._unsafeUnwrap();

      expect(result.posts).toEqual(
        posts.map((p) => ({
          id: p.id.toString()._unsafeUnwrap(),
          title: p.title,
          body: p.body,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        })),
      );
      expect(result.pagination).toEqual(pagination);
    });

    it("id.toString()でerrを返す", () => {
      const { title, body, createdAt, updatedAt } = createPostMock();
      const posts = [new Post(new PostId(null), title, body, createdAt, updatedAt)];

      const result = ListPostHttpQueryServiceDto.create(posts, pagination);

      expect(result).toEqual(err(new AppError(StatusCode.InternalServerError, "Id is null")));
    });
  });
});

describe.todo("ListPostHttpQueryService", () => {
  describe.todo("exec", () => {
    it.todo("dtoをokとして返す");

    it.todo("errを返す");
  });
});
