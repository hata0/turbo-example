import { PostId } from "@/domain/model/post";
import { createPostMock } from "@/tests/mocks/post";
import { createRandomSizeArray } from "@/utils/array";
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import {
  CreatePostHttpCommand,
  DeleteMultiplePostHttpCommand,
  DeletePostHttpCommand,
  EditPostHttpCommand,
} from "./post";

describe("CreatePostHttpCommand", () => {
  const { title, body } = createPostMock();
  const command = new CreatePostHttpCommand(title, body);

  describe("getPostTitle", () => {
    it("titleを返す", () => {
      expect(command.getPostTitle()).toBe(title);
    });
  });

  describe("getPostBody", () => {
    it("bodyを返す", () => {
      expect(command.getPostBody()).toBe(body);
    });
  });
});

describe("EditPostHttpCommand", () => {
  const id = faker.string.uuid();
  const { title, body } = createPostMock();
  const command = new EditPostHttpCommand(id, title, body);

  describe("getPostId", () => {
    it("PostIdを返す", () => {
      expect(command.getPostId()).toEqual(new PostId(id));
    });
  });

  describe("getPostTitle", () => {
    it("titleを返す", () => {
      expect(command.getPostTitle()).toBe(title);
    });
  });

  describe("getPostBody", () => {
    it("bodyを返す", () => {
      expect(command.getPostBody()).toBe(body);
    });
  });
});

describe("DeletePostHttpCommand", () => {
  const id = faker.string.uuid();
  const command = new DeletePostHttpCommand(id);

  describe("getPostId", () => {
    it("PostIdを返す", () => {
      expect(command.getPostId()).toEqual(new PostId(id));
    });
  });
});

describe("DeleteMultiplePostHttpCommand", () => {
  const ids = createRandomSizeArray({ min: 1, max: 10 }, () => {
    return faker.string.uuid();
  });
  const command = new DeleteMultiplePostHttpCommand(ids);

  describe("getPostIds", () => {
    it("PostId[]を返す", () => {
      command.getPostIds().map((id, index) => {
        expect(id).toEqual(new PostId(ids[index]));
      });
    });
  });
});
