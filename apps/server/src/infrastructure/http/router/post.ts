import type { OpenAPIHono } from "@hono/zod-openapi";
import { PostInjector } from "../injector/post";

export const registerPostApi = (app: OpenAPIHono) => {
  const postInjector = new PostInjector();

  postInjector.controller.list(app);
  postInjector.controller.create(app);
  postInjector.controller.update(app);
  postInjector.controller.delete(app);
  postInjector.controller.deleteMultiple(app);
};
