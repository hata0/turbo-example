import {
  createPostRoute,
  deleteManyPostRoute,
  deletePostRoute,
  getPostRoute,
  listPostRoute,
  updatePostRoute,
} from "@/openapi/paths/post";
import { handleZodError } from "@/utils/handleZodError";
import { OpenAPIHono } from "@hono/zod-openapi";
import { PostHandler } from "../handlers/post";

const postApi = new OpenAPIHono({
  defaultHook: handleZodError,
});

const postHandler = new PostHandler();

postApi.openapi(listPostRoute, (c) => postHandler.list(c));
postApi.openapi(getPostRoute, (c) => postHandler.get(c));
postApi.openapi(createPostRoute, (c) => postHandler.create(c));
postApi.openapi(updatePostRoute, (c) => postHandler.update(c));
postApi.openapi(deletePostRoute, (c) => postHandler.delete(c));
postApi.openapi(deleteManyPostRoute, (c) => postHandler.deleteMany(c));

export { postApi };
