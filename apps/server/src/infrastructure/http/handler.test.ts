import { RequestClient } from "@/test/util/request";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { handleError, handleZodError } from "./handler";

const exampleRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.number(),
          }),
        },
      },
      description: "success",
    },
  },
});

describe("handleZodError", () => {
  const app = new OpenAPIHono({
    defaultHook: handleZodError,
  });
  app.openapi(exampleRoute, (c) => {
    const { id } = c.req.valid("param");
    return c.json({ id }, 200);
  });
  const client = new RequestClient(app);

  it("result.successがfalseの場合、400", async () => {
    const res = await client.request("GET", "/abc");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      message: 'Validation error: Expected number, received nan at "id"',
    });
  });

  it("それ以外の場合、200になる", async () => {
    const res = await client.request("GET", "/1");

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: 1 });
  });
});

describe("handleError", () => {
  it("errorがZodErrorの場合、400", async () => {
    const app = new Hono();
    app.onError(handleError);

    app.get("/", (c) => {
      const schema = z.number();

      return c.json({ message: schema.parse("abc") }, 200);
    });

    const client = new RequestClient(app as OpenAPIHono);
    const res = await client.request("GET");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      message: "Validation error: Expected number, received string",
    });
  });

  it("それ以外の場合、500", async () => {
    const app = new Hono();
    app.onError(handleError);

    app.get("/", () => {
      throw new Error();
    });

    const client = new RequestClient(app as OpenAPIHono);
    const res = await client.request("GET");

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ message: "Internal server error" });
  });
});
