import { serve } from "@hono/node-server";
import type { OpenAPIHono } from "@hono/zod-openapi";

export const createServerHandler = (app: OpenAPIHono) => {
  const port = Number(process.env.PORT) || 8787;

  console.log(`Server is running on port ${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
};
