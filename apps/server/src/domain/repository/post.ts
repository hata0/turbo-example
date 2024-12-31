import type { AppError, StatusCodeType } from "@/core/error";
import type { Result } from "neverthrow";
import type { Post, PostId } from "../model/post";

export type IPostRepository = {
  findById: (
    id: PostId,
  ) => Promise<
    Result<Post, AppError<StatusCodeType["NotFound"] | StatusCodeType["InternalServerError"]>>
  >;
  count: () => Promise<number>;
  save: (post: Post) => Promise<Result<Post, AppError<StatusCodeType["InternalServerError"]>>>;
  update: (post: Post) => Promise<Result<Post, AppError<StatusCodeType["InternalServerError"]>>>;
  delete: (
    post: Post,
  ) => Promise<Result<undefined, AppError<StatusCodeType["InternalServerError"]>>>;
  deleteMultiple: (
    ids: PostId[],
  ) => Promise<Result<undefined, AppError<StatusCodeType["InternalServerError"]>>>;
};
