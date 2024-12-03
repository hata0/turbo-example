import { z } from "@hono/zod-openapi";
import { PaginationQuerySchema, PaginationResponseSchema } from "./pagination";

export const PostParamsSchema = z
  .object({
    id: z.string().openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1",
    }),
  })
  .openapi("PostParams");
export type PostRequest = z.infer<typeof PostParamsSchema>;

export const PostSchema = z
  .object({
    id: z.string().openapi({ example: "abc123def" }),
    title: z.string().openapi({ example: "foo" }),
    body: z.string().openapi({
      example:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum feugiat nunc, id elementum nulla venenatis ut. Praesent non nunc ultrices, consequat arcu sit amet, auctor lacus. Maecenas libero sem, tincidunt ut sapien quis, elementum vehicula augue. Cras non cursus nulla. Suspendisse congue posuere accumsan. Vivamus ut sollicitudin ligula. In viverra tellus vel porttitor feugiat. Ut bibendum turpis sed mauris egestas ultricies.",
    }),
    createdAt: z.string().datetime().openapi({ example: "2024-01-01T03:00:00.000Z" }),
    updatedAt: z.string().datetime().openapi({ example: "2024-01-01T03:00:00.000Z" }),
  })
  .openapi("Post");
export type Post = z.infer<typeof PostSchema>;

export const PostResponseSchema = z
  .object({
    post: PostSchema,
  })
  .openapi("PostResponse");
export type PostResponse = z.infer<typeof PostResponseSchema>;

export const PostsQuerySchema = z
  .object({
    sort: z.enum(["latest", "oldest"]).openapi({ example: "latest" }),
  })
  .extend(PaginationQuerySchema.shape)
  .openapi("PostsQuery");
export type PostsQuery = z.infer<typeof PostsQuerySchema>;

export const PostsResponseSchema = z
  .object({
    posts: z.array(PostSchema),
    pagination: PaginationResponseSchema,
  })
  .openapi("PostsResponse");
export type PostsResponse = z.infer<typeof PostsResponseSchema>;

export const CreatePostBodySchema = z
  .object({
    profileId: z.string().openapi({ example: "abc123def" }),
    title: z.string().openapi({ example: "foo" }),
    body: z.string().openapi({
      example:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum feugiat nunc, id elementum nulla venenatis ut. Praesent non nunc ultrices, consequat arcu sit amet, auctor lacus. Maecenas libero sem, tincidunt ut sapien quis, elementum vehicula augue. Cras non cursus nulla. Suspendisse congue posuere accumsan. Vivamus ut sollicitudin ligula. In viverra tellus vel porttitor feugiat. Ut bibendum turpis sed mauris egestas ultricies.",
    }),
  })
  .openapi("CreatePostBody");
export type CreatePostBody = z.infer<typeof CreatePostBodySchema>;

export const UpdatePostBodySchema = z
  .object({
    title: z.string().optional().openapi({ example: "foo" }),
    body: z.string().optional().openapi({
      example:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum feugiat nunc, id elementum nulla venenatis ut. Praesent non nunc ultrices, consequat arcu sit amet, auctor lacus. Maecenas libero sem, tincidunt ut sapien quis, elementum vehicula augue. Cras non cursus nulla. Suspendisse congue posuere accumsan. Vivamus ut sollicitudin ligula. In viverra tellus vel porttitor feugiat. Ut bibendum turpis sed mauris egestas ultricies.",
    }),
  })
  .openapi("UpdatePostBody");
export type UpdatePostBody = z.infer<typeof UpdatePostBodySchema>;

export const DeleteManyPostBodySchema = z
  .object({
    ids: z
      .string()
      .array()
      .openapi({ example: ["abc123def", "random-id"] }),
  })
  .openapi("DeleteManyPostBody");
export type DeleteManyPostBody = z.infer<typeof DeleteManyPostBodySchema>;
