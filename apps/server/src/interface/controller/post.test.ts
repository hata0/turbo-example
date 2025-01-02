import {
  type ListPostHttpQueryServiceDto,
  ListPostHttpQueryServiceInput,
} from "@/application/query-service/http/post/list";
import type { IPostHttpQueryService } from "@/application/query-service/http/post/post";
import type { IPostUseCase } from "@/application/use-case/post/use-case";
import { AppError, StatusCode } from "@/core/error";
import { createBasePaginationDtoMock } from "@/test/mock/pagination";
import { createListPostInputMock, createPostMock } from "@/test/mock/post";
import { createRandomSizeArray } from "@/test/util/array";
import { RequestClient } from "@/test/util/request";
import { faker } from "@faker-js/faker";
import { OpenAPIHono } from "@hono/zod-openapi";
import { err, ok } from "neverthrow";
import { describe, expect, it, vi } from "vitest";
import {
  CreatePostHttpCommand,
  DeleteMultiplePostHttpCommand,
  DeletePostHttpCommand,
  EditPostHttpCommand,
} from "../command/http/post";
import { PostController } from "./post";

describe("PostController", () => {
  const postUseCase = {
    create: vi.fn(),
    edit: vi.fn(),
    delete: vi.fn(),
    deleteMultiple: vi.fn(),
  } satisfies IPostUseCase;
  const postHttpQueryService = {
    list: { exec: vi.fn() },
  } satisfies IPostHttpQueryService;

  describe("list", () => {
    it("200", async () => {
      const posts = createRandomSizeArray({ min: 1, max: 30 }, () => {
        const { id, title, body, createdAt, updatedAt } = createPostMock();
        return {
          id: id.toString()._unsafeUnwrap(),
          title,
          body,
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
        } satisfies ListPostHttpQueryServiceDto["posts"][number];
      });
      const dto = {
        posts,
        pagination: createBasePaginationDtoMock(),
      } satisfies ListPostHttpQueryServiceDto;

      postHttpQueryService.list.exec.mockResolvedValueOnce(ok(dto));

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.list(app);

      const client = new RequestClient(app, "/posts");
      const { limit, page, sort } = createListPostInputMock();
      const res = await client.request("GET", `?limit=${limit}&page=${page}&sort=${sort}`);

      expect(postHttpQueryService.list.exec).toHaveBeenCalledWith(
        new ListPostHttpQueryServiceInput(limit, page, sort),
      );
      expect(res.status).toBe(StatusCode.Ok);
      expect(await res.json()).toEqual(dto);
    });

    it("query serviceで500", async () => {
      const message = faker.string.alpha(5);

      postHttpQueryService.list.exec.mockResolvedValueOnce(
        err(new AppError(StatusCode.InternalServerError, message)),
      );

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.list(app);

      const client = new RequestClient(app, "/posts");
      const { limit, page, sort } = createListPostInputMock();
      const res = await client.request("GET", `?limit=${limit}&page=${page}&sort=${sort}`);

      expect(postHttpQueryService.list.exec).toHaveBeenCalled();
      expect(res.status).toBe(StatusCode.InternalServerError);
      expect(await res.json()).toEqual({ message });
    });
  });

  describe("create", () => {
    it("200", async () => {
      postUseCase.create.mockResolvedValueOnce(ok(undefined));

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.create(app);

      const client = new RequestClient(app, "/posts");
      const { title, body } = createPostMock();
      const res = await client.request("POST", "", {
        body: { title, body },
      });

      expect(postUseCase.create).toHaveBeenCalledWith(new CreatePostHttpCommand(title, body));
      expect(res.status).toBe(StatusCode.Ok);
      expect(await res.json()).toEqual({ message: "Success" });
    });

    it("use caseで500", async () => {
      const message = faker.string.alpha(5);

      postUseCase.create.mockResolvedValueOnce(
        err(new AppError(StatusCode.InternalServerError, message)),
      );

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.create(app);

      const client = new RequestClient(app, "/posts");
      const { title, body } = createPostMock();
      const res = await client.request("POST", "", { body: { title, body } });

      expect(postUseCase.create).toHaveBeenCalled();
      expect(res.status).toBe(StatusCode.InternalServerError);
      expect(await res.json()).toEqual({ message });
    });
  });

  describe("update", () => {
    it("200", async () => {
      postUseCase.edit.mockResolvedValueOnce(ok(undefined));

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.update(app);

      const client = new RequestClient(app, "/posts");
      const { id, title, body } = createPostMock();
      const res = await client.request("PUT", `/${id.toString()._unsafeUnwrap()}`, {
        body: { title, body },
      });

      expect(postUseCase.edit).toHaveBeenCalledWith(
        new EditPostHttpCommand(id.toString()._unsafeUnwrap(), title, body),
      );
      expect(res.status).toBe(StatusCode.Ok);
      expect(await res.json()).toEqual({ message: "Success" });
    });

    it("use caseで500", async () => {
      const message = faker.string.alpha(5);

      postUseCase.edit.mockResolvedValueOnce(
        err(new AppError(StatusCode.InternalServerError, message)),
      );

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.update(app);

      const client = new RequestClient(app, "/posts");
      const { id, title, body } = createPostMock();
      const res = await client.request("PUT", `/${id.toString()._unsafeUnwrap()}`, {
        body: { title, body },
      });

      expect(postUseCase.edit).toHaveBeenCalled();
      expect(res.status).toBe(StatusCode.InternalServerError);
      expect(await res.json()).toEqual({ message });
    });
  });

  describe("delete", () => {
    it("200", async () => {
      postUseCase.delete.mockResolvedValueOnce(ok(undefined));

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.delete(app);

      const client = new RequestClient(app, "/posts");
      const { id } = createPostMock();
      const res = await client.request("DELETE", `/${id.toString()._unsafeUnwrap()}`);

      expect(postUseCase.delete).toHaveBeenCalledWith(
        new DeletePostHttpCommand(id.toString()._unsafeUnwrap()),
      );
      expect(res.status).toBe(StatusCode.Ok);
      expect(await res.json()).toEqual({ message: "Success" });
    });

    it("use caseで500", async () => {
      const message = faker.string.alpha(5);

      postUseCase.delete.mockResolvedValueOnce(
        err(new AppError(StatusCode.InternalServerError, message)),
      );

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.delete(app);

      const client = new RequestClient(app, "/posts");
      const id = createPostMock().id.toString()._unsafeUnwrap();
      const res = await client.request("DELETE", `/${id}`);

      expect(postUseCase.delete).toHaveBeenCalled();
      expect(res.status).toBe(StatusCode.InternalServerError);
      expect(await res.json()).toEqual({ message });
    });
  });

  describe("deleteMultiple", () => {
    it("200", async () => {
      postUseCase.deleteMultiple.mockResolvedValueOnce(ok(undefined));

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.deleteMultiple(app);

      const client = new RequestClient(app, "/posts");
      const ids = createRandomSizeArray({ min: 1, max: 10 }, () => {
        return createPostMock().id.toString()._unsafeUnwrap();
      });
      const res = await client.request("DELETE", "", { body: { ids } });

      expect(postUseCase.deleteMultiple).toHaveBeenCalledWith(
        new DeleteMultiplePostHttpCommand(ids),
      );
      expect(res.status).toBe(StatusCode.Ok);
      expect(await res.json()).toEqual({ message: "Success" });
    });

    it("use caseで500", async () => {
      const message = faker.string.alpha(5);

      postUseCase.deleteMultiple.mockResolvedValueOnce(
        err(new AppError(StatusCode.InternalServerError, message)),
      );

      const controller = new PostController(postUseCase, postHttpQueryService);
      const app = new OpenAPIHono();
      controller.deleteMultiple(app);

      const client = new RequestClient(app, "/posts");
      const ids = createRandomSizeArray({ min: 1, max: 10 }, () => {
        return createPostMock().id.toString()._unsafeUnwrap();
      });
      const res = await client.request("DELETE", "", { body: { ids } });

      expect(postUseCase.deleteMultiple).toHaveBeenCalled();
      expect(res.status).toBe(StatusCode.InternalServerError);
      expect(await res.json()).toEqual({ message });
    });
  });
});
