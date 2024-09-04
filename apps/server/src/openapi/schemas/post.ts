import { z } from "@hono/zod-openapi";

export const PostResponseSchema = z
  .object({
    name: z.string().openapi({ example: "foo" }),
    title: z.string().openapi({ example: "Sample post 1" }),
    body: z.string().openapi({
      example:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum feugiat nunc, id elementum nulla venenatis ut. Praesent non nunc ultrices, consequat arcu sit amet, auctor lacus. Maecenas libero sem, tincidunt ut sapien quis, elementum vehicula augue. Cras non cursus nulla. Suspendisse congue posuere accumsan. Vivamus ut sollicitudin ligula. In viverra tellus vel porttitor feugiat. Ut bibendum turpis sed mauris egestas ultricies.",
    }),
  })
  .openapi("PostResponse");
export type PostResponse = z.infer<typeof PostResponseSchema>;

export const PostsResponseSchema = z
  .object({
    posts: z.array(PostResponseSchema),
  })
  .openapi("PostsResponse");
export type PostsResponse = z.infer<typeof PostsResponseSchema>;

export const PostRequestSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "1",
  }),
});
export type PostRequest = z.infer<typeof PostRequestSchema>;
