import { createPostMock } from "@/test/mock/post";
import { fixDate } from "@/test/util/fake-timer";
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
  const now = fixDate();

  describe("createNew", () => {
    it("新しいPostを返す", () => {
      const { title, body } = createPostMock();
      const post = Post.createNew(title, body);
      expect(post.id.value).toBeNull();
      expect(post.title).toBe(title);
      expect(post.body).toBe(body);
      expect(post.createdAt).toEqual(now);
      expect(post.updatedAt).toEqual(now);
    });
  });

  describe("update", () => {
    it("更新されたPostを返す", () => {
      const mock = createPostMock();
      const post = new Post(mock.id, mock.title, mock.body, mock.createdAt, mock.updatedAt);
      const newMock = createPostMock();
      const updatedPost = post.update(newMock.title, newMock.body);
      expect(updatedPost.id).toBe(mock.id);
      expect(updatedPost.title).toBe(newMock.title);
      expect(updatedPost.body).toBe(newMock.body);
      expect(updatedPost.createdAt).toBe(mock.createdAt);
      expect(updatedPost.updatedAt).toEqual(now);
    });
  });
});
