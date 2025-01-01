import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { handleError, handleZodError } from "./handler";

export const newApp = () => {
  const app = new OpenAPIHono({
    defaultHook: handleZodError,
  });

  app.onError(handleError);

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Tutorial API",
    },
  });
  app.get("/ui", swaggerUI({ url: "/doc" }));

  return app;
};
