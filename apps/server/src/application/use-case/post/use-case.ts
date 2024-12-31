import type { AppError, Status } from "@/core/error";
import { Post } from "@/domain/model/post";
import type { IPostRepository } from "@/domain/repository/post";
import { type Result, err, ok } from "neverthrow";
import type {
  ICreatePostCommand,
  IDeleteMultiplePostCommand,
  IDeletePostCommand,
  IEditPostCommand,
} from "./command";

export type IPostUseCase = {
  create: (
    command: ICreatePostCommand,
  ) => Promise<Result<undefined, AppError<Status<"InternalServerError">>>>;
  edit: (
    command: IEditPostCommand,
  ) => Promise<Result<undefined, AppError<Status<"NotFound" | "InternalServerError">>>>;
  delete: (
    command: IDeletePostCommand,
  ) => Promise<Result<undefined, AppError<Status<"NotFound" | "InternalServerError">>>>;
  deleteMultiple: (
    command: IDeleteMultiplePostCommand,
  ) => Promise<Result<undefined, AppError<Status<"InternalServerError">>>>;
};

export class PostUseCase implements IPostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async create(
    command: ICreatePostCommand,
  ): Promise<Result<undefined, AppError<Status<"InternalServerError">>>> {
    const post = Post.createNew(command.getPostTitle(), command.getPostBody());
    const newPostOrError = await this.postRepository.save(post);
    if (newPostOrError.isErr()) {
      return err(newPostOrError.error);
    }
    return ok(undefined);
  }

  async edit(
    command: IEditPostCommand,
  ): Promise<Result<undefined, AppError<Status<"NotFound" | "InternalServerError">>>> {
    const postOrError = await this.postRepository.findById(command.getPostId());
    if (postOrError.isErr()) {
      return err(postOrError.error);
    }
    const newPost = postOrError.value.update(command.getPostTitle(), command.getPostBody());
    const newPostOrError = await this.postRepository.update(newPost);
    if (newPostOrError.isErr()) {
      return err(newPostOrError.error);
    }
    return ok(undefined);
  }

  async delete(
    command: IDeletePostCommand,
  ): Promise<Result<undefined, AppError<Status<"NotFound" | "InternalServerError">>>> {
    const postOrError = await this.postRepository.findById(command.getPostId());
    if (postOrError.isErr()) {
      return err(postOrError.error);
    }
    const res = await this.postRepository.delete(postOrError.value);
    if (res.isErr()) {
      return err(res.error);
    }
    return ok(undefined);
  }

  async deleteMultiple(
    command: IDeleteMultiplePostCommand,
  ): Promise<Result<undefined, AppError<Status<"InternalServerError">>>> {
    const res = await this.postRepository.deleteMultiple(command.getPostIds());
    if (res.isErr()) {
      return err(res.error);
    }
    return ok(undefined);
  }
}
