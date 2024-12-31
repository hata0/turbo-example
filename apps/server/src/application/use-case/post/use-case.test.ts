import { AppError, StatusCode } from "@/core/error";
import { Post, PostId } from "@/domain/model/post";
import type { IPostRepository } from "@/domain/repository/post";
import { createPostMock } from "@/tests/mocks/post";
import { generateRandomArray } from "@/tests/utils/array";
import { fixDate } from "@/tests/utils/fake-timer";
import { faker } from "@faker-js/faker";
import { err, ok } from "neverthrow";
import { describe, expect, it, vi } from "vitest";
import type {
  ICreatePostCommand,
  IDeleteMultiplePostCommand,
  IDeletePostCommand,
  IEditPostCommand,
} from "./command";
import { PostUseCase } from "./use-case";

describe("PostUseCase", () => {
  const now = fixDate();
  const postRepository = {
    findById: vi.fn(),
    count: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    deleteMultiple: vi.fn(),
  } satisfies IPostRepository;

  describe("create", () => {
    const { id, title, body } = createPostMock();
    const command = {
      getPostTitle: () => title,
      getPostBody: () => body,
    } satisfies ICreatePostCommand;
    const newPost = new Post(id, title, body, new Date(), new Date());

    it("okを返す", async () => {
      postRepository.save.mockResolvedValueOnce(ok(newPost));

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.create(command);

      expect(postRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: new PostId(null),
          title,
          body,
          createdAt: now,
          updatedAt: now,
        }),
      );
      expect(result).toEqual(ok(undefined));
    });

    it("errを返す", async () => {
      const message = faker.string.alpha(5);
      const error = err(new AppError(StatusCode.InternalServerError, message));

      postRepository.save.mockResolvedValueOnce(error);

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.create(command);

      expect(result).toEqual(error);
    });
  });

  describe("edit", () => {
    const prevPostMock = createPostMock();
    const prevPost = new Post(
      prevPostMock.id,
      prevPostMock.title,
      prevPostMock.body,
      prevPostMock.createdAt,
      prevPostMock.updatedAt,
    );

    const newPostMock = createPostMock();
    const command = {
      getPostId: () => prevPostMock.id,
      getPostTitle: () => newPostMock.title,
      getPostBody: () => newPostMock.body,
    } satisfies IEditPostCommand;
    const newPost = new Post(
      prevPostMock.id,
      newPostMock.title,
      newPostMock.body,
      prevPostMock.createdAt,
      new Date(),
    );

    it("okを返す", async () => {
      postRepository.findById.mockResolvedValueOnce(ok(prevPost));
      postRepository.update.mockResolvedValueOnce(ok(newPost));

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.edit(command);

      expect(postRepository.findById).toHaveBeenCalledWith(prevPostMock.id);
      expect(postRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          id: prevPostMock.id,
          title: newPostMock.title,
          body: newPostMock.body,
          createdAt: prevPostMock.createdAt,
          updatedAt: now,
        }),
      );
      expect(result).toEqual(ok(undefined));
    });

    it("findByIdでerrを返す", async () => {
      const message = faker.string.alpha(5);
      const error = err(new AppError(StatusCode.NotFound, message));

      postRepository.findById.mockResolvedValueOnce(error);

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.edit(command);

      expect(postRepository.findById).toHaveBeenCalled();
      expect(postRepository.update).not.toHaveBeenCalled();
      expect(result).toEqual(error);
    });

    it("updateでerrを返す", async () => {
      const message = faker.string.alpha(5);
      const error = err(new AppError(StatusCode.InternalServerError, message));

      postRepository.findById.mockResolvedValueOnce(ok(prevPost));
      postRepository.update.mockResolvedValueOnce(error);

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.edit(command);

      expect(postRepository.findById).toHaveBeenCalled();
      expect(postRepository.update).toHaveBeenCalled();
      expect(result).toEqual(error);
    });
  });

  describe("delete", () => {
    const { id, title, body, createdAt, updatedAt } = createPostMock();
    const command = {
      getPostId: () => id,
    } satisfies IDeletePostCommand;
    const post = new Post(id, title, body, createdAt, updatedAt);

    it("okを返す", async () => {
      postRepository.findById.mockResolvedValueOnce(ok(post));
      postRepository.delete.mockResolvedValueOnce(ok(undefined));

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.delete(command);

      expect(postRepository.findById).toHaveBeenCalledWith(id);
      expect(postRepository.delete).toHaveBeenCalledWith(post);
      expect(result).toEqual(ok(undefined));
    });

    it("findByIdでerrを返す", async () => {
      const message = faker.string.alpha(5);
      const error = err(new AppError(StatusCode.NotFound, message));

      postRepository.findById.mockResolvedValueOnce(error);

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.delete(command);

      expect(postRepository.findById).toHaveBeenCalled();
      expect(postRepository.delete).not.toHaveBeenCalled();
      expect(result).toEqual(error);
    });

    it("deleteでerrを返す", async () => {
      const message = faker.string.alpha(5);
      const error = err(new AppError(StatusCode.InternalServerError, message));

      postRepository.findById.mockResolvedValueOnce(ok(post));
      postRepository.delete.mockResolvedValueOnce(error);

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.delete(command);

      expect(postRepository.findById).toHaveBeenCalled();
      expect(postRepository.delete).toHaveBeenCalled();
      expect(result).toEqual(error);
    });
  });

  describe("deleteMultiple", () => {
    const ids = generateRandomArray({ min: 2, max: 5 }, () => new PostId(faker.string.uuid()));
    const command = {
      getPostIds: () => ids,
    } satisfies IDeleteMultiplePostCommand;

    it("okを返す", async () => {
      postRepository.deleteMultiple.mockResolvedValueOnce(ok(undefined));

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.deleteMultiple(command);

      expect(postRepository.deleteMultiple).toHaveBeenCalledWith(ids);
      expect(result).toEqual(ok(undefined));
    });

    it("errを返す", async () => {
      const message = faker.string.alpha(5);
      const error = err(new AppError(StatusCode.InternalServerError, message));

      postRepository.deleteMultiple.mockResolvedValueOnce(error);

      const postUseCase = new PostUseCase(postRepository);
      const result = await postUseCase.deleteMultiple(command);

      expect(postRepository.deleteMultiple).toHaveBeenCalled();
      expect(result).toEqual(error);
    });
  });
});
