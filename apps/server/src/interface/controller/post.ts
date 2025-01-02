import { ListPostHttpQueryServiceInput } from "@/application/query-service/http/post/list";
import type { IPostHttpQueryService } from "@/application/query-service/http/post/post";
import type { IPostUseCase } from "@/application/use-case/post/use-case";
import { StatusCode } from "@/core/error";
import {
  CreatePostHttpCommand,
  DeleteMultiplePostHttpCommand,
  DeletePostHttpCommand,
  EditPostHttpCommand,
} from "@/interface/command/http/post";
import {
  createPostRoute,
  deleteMultiplePostRoute,
  deletePostRoute,
  listPostRoute,
  updatePostRoute,
} from "@/openapi/path/post";
import { PaginationResponseSchema } from "@/openapi/schema/pagination";
import { PostSchema } from "@/openapi/schema/post";
import type { OpenAPIHono } from "@hono/zod-openapi";

export class PostController {
  constructor(
    private readonly postUseCase: IPostUseCase,
    private readonly postHttpQueryService: IPostHttpQueryService,
  ) {}

  list(app: OpenAPIHono) {
    app.openapi(listPostRoute, async (c) => {
      const query = c.req.valid("query");

      const input = new ListPostHttpQueryServiceInput(query.limit, query.page, query.sort);
      const result = await this.postHttpQueryService.list.exec(input);
      if (result.isErr()) {
        return c.json({ message: result.error.message }, result.error.code);
      }

      const posts = result.value.posts.map((p) => PostSchema.parse(p));
      const pagination = PaginationResponseSchema.parse(result.value.pagination);

      return c.json({ posts, pagination }, StatusCode.Ok);
    });

    return app;
  }

  async create(app: OpenAPIHono) {
    app.openapi(createPostRoute, async (c) => {
      const body = c.req.valid("json");

      const command = new CreatePostHttpCommand(body.title, body.body);
      const result = await this.postUseCase.create(command);
      if (result.isErr()) {
        return c.json({ message: result.error.message }, result.error.code);
      }

      return c.json({ message: "Success" }, StatusCode.Ok);
    });

    return app;
  }

  async update(app: OpenAPIHono) {
    app.openapi(updatePostRoute, async (c) => {
      const body = c.req.valid("json");
      const param = c.req.valid("param");

      const command = new EditPostHttpCommand(param.id, body.title, body.body);
      const result = await this.postUseCase.edit(command);
      if (result.isErr()) {
        return c.json({ message: result.error.message }, result.error.code);
      }

      return c.json({ message: "Success" }, StatusCode.Ok);
    });

    return app;
  }

  async delete(app: OpenAPIHono) {
    app.openapi(deletePostRoute, async (c) => {
      const param = c.req.valid("param");

      const command = new DeletePostHttpCommand(param.id);
      const result = await this.postUseCase.delete(command);
      if (result.isErr()) {
        return c.json({ message: result.error.message }, result.error.code);
      }

      return c.json({ message: "Success" }, StatusCode.Ok);
    });

    return app;
  }

  async deleteMultiple(app: OpenAPIHono) {
    app.openapi(deleteMultiplePostRoute, async (c) => {
      const body = c.req.valid("json");

      const command = new DeleteMultiplePostHttpCommand(body.ids);
      const result = await this.postUseCase.deleteMultiple(command);
      if (result.isErr()) {
        return c.json({ message: result.error.message }, result.error.code);
      }

      return c.json({ message: "Success" }, StatusCode.Ok);
    });

    return app;
  }
}
