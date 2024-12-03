import { createRoute } from "@hono/zod-openapi";
import { ErrorResponseSchema } from "../schemas/error";
import {
  CreatePostBodySchema,
  DeleteManyPostBodySchema,
  PostParamsSchema,
  PostResponseSchema,
  PostsQuerySchema,
  PostsResponseSchema,
  UpdatePostBodySchema,
} from "../schemas/post";
import { SuccessResponseSchema } from "../schemas/success";

export const listPostRoute = createRoute({
  tags: ["post"],
  method: "get",
  path: "/",
  summary: "ポスト一覧を取得",
  request: {
    query: PostsQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostsResponseSchema,
        },
      },
      description: "ポスト一覧を持つオブジェクトを返す",
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

export const getPostRoute = createRoute({
  tags: ["post"],
  method: "get",
  path: "/{id}",
  summary: "ポストを取得",
  request: {
    params: PostParamsSchema,
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
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "404エラーを返す",
    },
  },
});

export const createPostRoute = createRoute({
  tags: ["post"],
  method: "post",
  path: "/",
  summary: "ポストを作成",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreatePostBodySchema,
        },
      },
      description: "作成するポストの内容",
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostResponseSchema,
        },
      },
      description: "作成したポストを返す",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "エラーを返す",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "サーバーエラーを返す",
    },
  },
});

export const updatePostRoute = createRoute({
  tags: ["post"],
  method: "put",
  path: "/{id}",
  summary: "ポストの更新",
  request: {
    params: PostParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdatePostBodySchema,
        },
      },
      description: "更新するポストの内容",
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostResponseSchema,
        },
      },
      description: "更新したポストを返す",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "エラーを返す",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "サーバーエラーを返す",
    },
  },
});

export const deletePostRoute = createRoute({
  tags: ["post"],
  method: "delete",
  path: "/{id}",
  summary: "ポストを削除",
  request: {
    params: PostParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessResponseSchema,
        },
      },
      description: "成功を返す",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "エラーを返す",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "サーバーエラーを返す",
    },
  },
});

export const deleteManyPostRoute = createRoute({
  tags: ["post"],
  method: "delete",
  path: "/",
  summary: "ポストを複数削除",
  request: {
    body: {
      content: {
        "application/json": {
          schema: DeleteManyPostBodySchema,
        },
      },
      description: "削除するポストのid",
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessResponseSchema,
        },
      },
      description: "成功を返す",
    },
  },
});
