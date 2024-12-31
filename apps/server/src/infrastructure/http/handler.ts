import type { Context, ValidationTargets } from "hono";
import type { ZodError } from "zod";
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
    return c.json({ message: fromError(result.error).toString() }, 400);
  }
};
