import { createRoute } from "@hono/zod-openapi";
import { ErrorResponseSchema } from "../schema/error";
import {
  CreatePostBodySchema,
  DeleteManyPostBodySchema,
  PostParamsSchema,
  PostResponseSchema,
  PostsQuerySchema,
  PostsResponseSchema,
  UpdatePostBodySchema,
} from "../schema/post";
import { SuccessResponseSchema } from "../schema/success";

export const listPostRoute = createRoute({
  tags: ["posts"],
  method: "get",
  path: "/posts",
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

export const getPostRoute = createRoute({
  tags: ["posts"],
  method: "get",
  path: "/posts/{id}",
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
  tags: ["posts"],
  method: "post",
  path: "/posts",
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

export const updatePostRoute = createRoute({
  tags: ["posts"],
  method: "put",
  path: "/posts/{id}",
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
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "404エラーを返す",
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
  tags: ["posts"],
  method: "delete",
  path: "/posts/{id}",
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
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "404エラーを返す",
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
  tags: ["posts"],
  method: "delete",
  path: "/posts",
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
