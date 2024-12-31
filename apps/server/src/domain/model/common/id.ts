import { AppError, type Status, StatusCode } from "@/core/error";
import { type Result, err, ok } from "neverthrow";

export abstract class Id {
  constructor(public readonly value: string | null) {}

  toString(): Result<string, AppError<Status<"InternalServerError">>> {
    if (this.value === null) {
      return err(new AppError(StatusCode.InternalServerError, "Id is null"));
    }
    return ok(this.value);
  }
}
