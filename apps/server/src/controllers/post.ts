import {
  ErrorResponse,
  PostRequestSchema,
  PostResponseSchema,
} from "@packages/openapi/schemas";
import { Context } from "hono";
import { getPostHandler } from "../handlers/post";

export const getPostController = (c: Context) => {
  const validationResult = PostRequestSchema.safeParse(c.req.param());
  if (!validationResult.success) {
    return c.json(
      {
        message: "Bad Request",
      } satisfies ErrorResponse,
      400,
    );
  }

  const result = getPostHandler();

  return c.json(PostResponseSchema.parse(result), 200);
};
