import { createRoute } from "@hono/zod-openapi";
import {
  PostRequestSchema,
  PostResponseSchema,
  PostsResponseSchema,
} from "../schemas/post";
import { ErrorResponseSchema } from "../schemas/error";

export const getPostRoute = createRoute({
  method: "get",
  path: "/{id}",
  summary: "ポストを取得",
  request: {
    params: PostRequestSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostResponseSchema,
        },
      },
      description: "ポストを返す",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "エラーを返す",
    },
  },
});

export const listPostsRoute = createRoute({
  method: "post",
  path: "/",
  summary: "ポスト一覧を取得",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostsResponseSchema,
        },
      },
      description: "ポスト一覧を持つオブジェクトを返す",
    },
  },
});