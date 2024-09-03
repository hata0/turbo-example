import { getPostController, listPostController } from "@/controllers/post";
import { OpenAPIHono } from "@hono/zod-openapi";
import { getPostRoute, listPostsRoute } from "@packages/openapi/paths";

const postApi = new OpenAPIHono();

postApi.openapi(getPostRoute, (c) => getPostController(c));
postApi.openapi(listPostsRoute, (c) => listPostController(c));

export { postApi };
