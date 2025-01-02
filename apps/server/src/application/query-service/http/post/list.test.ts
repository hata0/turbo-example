import { AppError, StatusCode } from "@/core/error";
import { Post, PostId } from "@/domain/model/post";
import { createBasePaginationDtoMock } from "@/test/mock/pagination";
import { createListPostInputMock, createPostMock } from "@/test/mock/post";
import { createRandomSizeArray } from "@/test/util/array";
import { objectValuesToArray } from "@/util/array";
import { err } from "neverthrow";
import { describe, expect, it } from "vitest";
import {
  ListPostHttpQueryServiceDto,
  ListPostHttpQueryServiceInput,
  PostSortPattern,
} from "./list";

describe("ListPostQueryServiceInput", () => {
  describe("getOrderBy", () => {
    it("適切なソート順のorderByを返す", () => {
      const expectedOrders = {
        [PostSortPattern.Newest]: { createdAt: "desc" },
        [PostSortPattern.Oldest]: { createdAt: "asc" },
      };

      objectValuesToArray(PostSortPattern, (sort) => {
        const { limit, page } = createListPostInputMock();

        const input = new ListPostHttpQueryServiceInput(limit, page, sort);
        const orderBy = input.getOrderBy();

        expect(orderBy).toEqual(expectedOrders[sort]);
      });
    });
  });
});

describe("ListPostQueryServiceDto", () => {
  describe("create", () => {
    const pagination = createBasePaginationDtoMock();

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
