import {
  createPostRoute,
  deleteManyPostRoute,
  deletePostRoute,
  listPostRoute,
  updatePostRoute,
} from "@/openapi/paths/post";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { PostInjector } from "../injector/post";

export const registerPostApi = (app: OpenAPIHono) => {
  const postInjector = new PostInjector();

  app.openapi(listPostRoute, (c) => postInjector.handler.list(c));
  app.openapi(createPostRoute, (c) => postInjector.handler.create(c));
  app.openapi(updatePostRoute, (c) => postInjector.handler.update(c));
  app.openapi(deletePostRoute, (c) => postInjector.handler.delete(c));
  app.openapi(deleteManyPostRoute, (c) => postInjector.handler.deleteMultiple(c));
};
