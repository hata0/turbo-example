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
import { PaginationResponseSchema } from "@/openapi/schemas/pagination";
import {
  CreatePostBodySchema,
  DeleteManyPostBodySchema,
  PostParamsSchema,
  PostSchema,
  PostsQuerySchema,
  UpdatePostBodySchema,
} from "@/openapi/schemas/post";
import type { Context } from "hono";
import { parseJsonBody } from "./util";

export class PostHandler {
  constructor(
    private readonly postUseCase: IPostUseCase,
    private readonly postHttpQueryService: IPostHttpQueryService,
  ) {}

  async list(c: Context) {
    const query = PostsQuerySchema.parse(c.req.query());

    const input = new ListPostHttpQueryServiceInput(query.limit, query.page, query.sort);
    const result = await this.postHttpQueryService.list.exec(input);
    if (result.isErr()) {
      return c.json({ message: result.error.message }, result.error.code);
    }

    const posts = result.value.posts.map((p) => PostSchema.parse(p));
    const pagination = PaginationResponseSchema.parse(result.value.pagination);

    return c.json({ posts, pagination }, StatusCode.Ok);
  }

  async create(c: Context) {
    const bodyOrError = await parseJsonBody(c);
    if (bodyOrError.isErr()) {
      return bodyOrError.error;
    }
    const body = CreatePostBodySchema.parse(bodyOrError.value);

    const command = new CreatePostHttpCommand(body.title, body.body);
    const result = await this.postUseCase.create(command);
    if (result.isErr()) {
      return c.json({ message: result.error.message }, result.error.code);
    }

    return c.json({ message: "Success" }, StatusCode.Ok);
  }

  async update(c: Context) {
    const bodyOrError = await parseJsonBody(c);
    if (bodyOrError.isErr()) {
      return bodyOrError.error;
    }
    const body = UpdatePostBodySchema.parse(bodyOrError.value);
    const param = PostParamsSchema.parse(c.req.param());

    const command = new EditPostHttpCommand(param.id, body.title, body.body);
    const result = await this.postUseCase.edit(command);
    if (result.isErr()) {
      return c.json({ message: result.error.message }, result.error.code);
    }

    return c.json({ message: "Success" }, StatusCode.Ok);
  }

  async delete(c: Context) {
    const param = PostParamsSchema.parse(c.req.param());

    const command = new DeletePostHttpCommand(param.id);
    const result = await this.postUseCase.delete(command);
    if (result.isErr()) {
      return c.json({ message: result.error.message }, result.error.code);
    }

    return c.json({ message: "Success" }, StatusCode.Ok);
  }

  async deleteMultiple(c: Context) {
    const bodyOrError = await parseJsonBody(c);
    if (bodyOrError.isErr()) {
      return bodyOrError.error;
    }
    const body = DeleteManyPostBodySchema.parse(bodyOrError.value);

    const command = new DeleteMultiplePostHttpCommand(body.ids);
    const result = await this.postUseCase.deleteMultiple(command);
    if (result.isErr()) {
      return c.json({ message: result.error.message }, result.error.code);
    }

    return c.json({ message: "Success" }, StatusCode.Ok);
  }
}
