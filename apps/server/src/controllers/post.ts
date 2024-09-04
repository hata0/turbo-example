import { getPostHandler, listPostHandler } from "@/handlers/post";
import type { ErrorResponse } from "@/openapi/schemas/error";
import { PostRequestSchema, PostResponseSchema, PostsResponseSchema } from "@/openapi/schemas/post";
import type { Context } from "hono";

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

export const listPostController = (c: Context) => {
  const result = listPostHandler();

  return c.json(PostsResponseSchema.parse(result), 200);
};
