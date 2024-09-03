import { getPostController } from "@/controllers/post";
import { OpenAPIHono } from "@hono/zod-openapi";
import { getPostRoute } from "@packages/openapi/paths";

const postApi = new OpenAPIHono();

postApi.openapi(getPostRoute, (c) => getPostController(c));

export { postApi };
