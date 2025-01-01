import { StatusCode } from "@/core/error";
import type { Context } from "hono";
import { err, fromPromise, ok } from "neverthrow";

export const parseJsonBody = async (c: Context) => {
  const bodyOrError = await fromPromise(c.req.json(), (e) => e);
  if (bodyOrError.isErr()) {
    return err(c.json({ message: "Invalid body" }, StatusCode.BadRequest));
  }

  return ok(bodyOrError.value);
};
