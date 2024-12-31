import type { AppError, StatusCodeType } from "@/core/error";
import { Post } from "@/domain/model/post";
import type { IPostRepository } from "@/domain/repository/post";
import { type Result, err, ok } from "neverthrow";
import type {
  CreatePostCommand,
  DeleteMultiplePostCommand,
  DeletePostCommand,
  EditPostCommand,
} from "./command";

export type IPostUseCase = {
  create: (
    command: CreatePostCommand,
  ) => Promise<Result<undefined, AppError<StatusCodeType["InternalServerError"]>>>;
  edit: (
    command: EditPostCommand,
  ) => Promise<
    Result<undefined, AppError<StatusCodeType["NotFound"] | StatusCodeType["InternalServerError"]>>
  >;
  delete: (
    command: DeletePostCommand,
  ) => Promise<
    Result<undefined, AppError<StatusCodeType["NotFound"] | StatusCodeType["InternalServerError"]>>
  >;
  deleteMultiple: (
    command: DeleteMultiplePostCommand,
  ) => Promise<Result<undefined, AppError<StatusCodeType["InternalServerError"]>>>;
};

export class PostUseCase implements IPostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async create(
    command: CreatePostCommand,
  ): Promise<Result<undefined, AppError<StatusCodeType["InternalServerError"]>>> {
    const post = Post.createNew(command.getPostTitle(), command.getPostBody());
    const newPostOrError = await this.postRepository.save(post);
    if (newPostOrError.isErr()) {
      return err(newPostOrError.error);
    }
    return ok(undefined);
  }

  async edit(
    command: EditPostCommand,
  ): Promise<
    Result<undefined, AppError<StatusCodeType["NotFound"] | StatusCodeType["InternalServerError"]>>
  > {
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
    command: DeletePostCommand,
  ): Promise<
    Result<undefined, AppError<StatusCodeType["NotFound"] | StatusCodeType["InternalServerError"]>>
  > {
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
    command: DeleteMultiplePostCommand,
  ): Promise<Result<undefined, AppError<StatusCodeType["InternalServerError"]>>> {
    const res = await this.postRepository.deleteMultiple(command.getPostIds());
    if (res.isErr()) {
      return err(res.error);
    }
    return ok(undefined);
  }
}
