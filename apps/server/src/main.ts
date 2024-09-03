import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { postApi } from "./routes/post";

const app = new OpenAPIHono();

app.route("/posts", postApi);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Tutorial API",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

export { app };
