import { z } from "@hono/zod-openapi";

export const PaginationQuerySchema = z
  .object({
    limit: z.coerce.number().openapi({ example: 5 }),
    page: z.coerce.number().openapi({ example: 2 }),
  })
  .openapi("PaginationQuery");
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const PaginationResponseSchema = z
  .object({
    currentPage: z.number().openapi({ example: 2 }),
    totalPage: z.number().openapi({ example: 5 }),
    totalCount: z.number().openapi({ example: 22 }),
  })
  .openapi("PaginationResponse");
export type PaginationResponse = z.infer<typeof PaginationResponseSchema>;
