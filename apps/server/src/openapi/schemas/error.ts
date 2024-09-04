import { z } from "@hono/zod-openapi";

export const ErrorResponseSchema = z
  .object({
    message: z.string().openapi({ example: "Bad Request" }),
  })
  .openapi("ErrorResponse");
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
