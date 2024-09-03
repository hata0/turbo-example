import { serve } from "@hono/node-server";
import { app } from "./main";

const port = 8787;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
