import { AppError, StatusCode, type StatusCodeType } from "@/core/error";
import { type Result, err, ok } from "neverthrow";

export abstract class Id {
  constructor(public readonly value: string | null) {}

  toString(): Result<string, AppError<StatusCodeType["InternalServerError"]>> {
    if (this.value === null) {
      return err(new AppError(StatusCode.InternalServerError, "Id is null"));
    }
    return ok(this.value);
  }
}
