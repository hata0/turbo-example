import type { AppError, Status } from "@/core/error";
import type { Result } from "neverthrow";
import type { Post, PostId } from "../model/post";

export type IPostRepository = {
  findById: (
    id: PostId,
  ) => Promise<Result<Post, AppError<Status<"NotFound" | "InternalServerError">>>>;
  count: () => Promise<number>;
  save: (post: Post) => Promise<Result<Post, AppError<Status<"InternalServerError">>>>;
  update: (post: Post) => Promise<Result<Post, AppError<Status<"InternalServerError">>>>;
  delete: (post: Post) => Promise<Result<undefined, AppError<Status<"InternalServerError">>>>;
  deleteMultiple: (
    ids: PostId[],
  ) => Promise<Result<undefined, AppError<Status<"InternalServerError">>>>;
};
