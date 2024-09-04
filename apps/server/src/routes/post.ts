import { getPostController, listPostController } from "@/controllers/post";
import { getPostRoute, listPostsRoute } from "@/openapi/paths/posts";
import { OpenAPIHono } from "@hono/zod-openapi";

const postApi = new OpenAPIHono();

postApi.openapi(getPostRoute, (c) => getPostController(c));
postApi.openapi(listPostsRoute, (c) => listPostController(c));

export { postApi };
