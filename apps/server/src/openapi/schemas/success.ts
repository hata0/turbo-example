import { z } from "@hono/zod-openapi";

export const SuccessResponseSchema = z
  .object({
    message: z.string().openapi({ example: "success" }),
  })
  .openapi("SuccessResponse");
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;
