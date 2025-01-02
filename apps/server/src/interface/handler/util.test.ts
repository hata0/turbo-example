import { StatusCode } from "@/core/error";
import { RequestClient } from "@/test/util/request";
import { faker } from "@faker-js/faker";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { parseJsonBody } from "./util";

describe("parseJsonBody", () => {
  const app = new Hono();
  app.post("/", async (c) => {
    const bodyOrError = await parseJsonBody(c);
    if (bodyOrError.isErr()) {
      return bodyOrError.error;
    }

    return c.json(bodyOrError.value, 200);
  });
  const client = new RequestClient(app as OpenAPIHono);

  it("bodyのokを返す", async () => {
    const body = { message: faker.string.alpha({ length: { min: 0, max: 10 } }) };
    const res = await client.request("POST", "/", { body });

    expect(await res.json()).toEqual(body);
  });

  it("400のerrを返す", async () => {
    const res = await client.request("POST", "/");

    expect(res.status).toBe(StatusCode.BadRequest);
    expect(await res.json());
  });
});
