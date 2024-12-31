import { newApp } from "@/infrastructure/http/app";
import { createServerHandler } from "@/infrastructure/http/node";
import { registerPostApi } from "@/infrastructure/http/router/post";
import { cors } from "hono/cors";

const app = newApp();
app.notFound((c) => {
  return c.json({ message: "Not found" }, 404);
});
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

registerPostApi(app);

createServerHandler(app);
