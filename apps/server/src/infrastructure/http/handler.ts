import { StatusCode } from "@/core/error";
import type { Context, ValidationTargets } from "hono";
import type { HTTPResponseError } from "hono/types";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";

type Result =
  | {
      target: keyof ValidationTargets;
      success: false;
      error: ZodError;
    }
  | {
      target: keyof ValidationTargets;
      success: true;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      data: any;
    };

export const handleZodError = (result: Result, c: Context) => {
  if (!result.success) {
    return c.json({ message: fromError(result.error).toString() }, StatusCode.BadRequest);
  }
};

export const handleError = (error: Error | HTTPResponseError, c: Context) => {
  if (error instanceof ZodError) {
    return c.json({ message: fromError(error).toString() }, StatusCode.BadRequest);
  }
  return c.json({ message: "Internal server error" }, StatusCode.InternalServerError);
};
