import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Post, PostId } from "./post";

describe("PostId", () => {
  describe("createAsNull", () => {
    it("nullのIdを返す", () => {
      const id = PostId.createAsNull();
      expect(id.value).toBeNull();
    });
  });
});

describe("Post", () => {
  describe("createNew", () => {
    it("新しいPostを返す", () => {
      const title = faker.string.alpha();
      const body = faker.lorem.lines();
      const post = Post.createNew(title, body);
      expect(post.id.value).toBeNull();
      expect(post.title).toBe(title);
      expect(post.body).toBe(body);
      expect(post.createdAt).toBeInstanceOf(Date);
      expect(post.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe("update", () => {
    it("更新されたPostを返す", () => {
      const id = new PostId(faker.string.uuid());
      const title = faker.string.alpha();
      const body = faker.lorem.lines();
      const updatedAt = faker.date.past();
      const createdAt = faker.date.past({ refDate: updatedAt });
      const post = new Post(id, title, body, createdAt, updatedAt);
      const newTitle = faker.string.alpha();
      const newBody = faker.lorem.lines();
      const updatedPost = post.update(newTitle, newBody);
      expect(updatedPost.id).toBe(id);
      expect(updatedPost.title).toBe(newTitle);
      expect(updatedPost.body).toBe(newBody);
      expect(updatedPost.createdAt).toBe(createdAt);
      expect(updatedPost.updatedAt).not.toBe(updatedAt);
    });
  });
});
