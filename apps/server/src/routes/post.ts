import { OpenAPIHono } from "@hono/zod-openapi";
import { getPostRoute } from "@packages/openapi/paths";
import { getPostController } from "../controllers/post";

const postApi = new OpenAPIHono();

postApi.openapi(getPostRoute, (c) => getPostController(c));

export { postApi };
