import { AppError, StatusCode, type StatusCodeType } from "@/core/error";
import { Post, PostId } from "@/domain/model/post";
import type { IPostRepository } from "@/domain/repository/post";
import type { Post as PostRecord, PrismaClient } from "@prisma/client";
import { type Result, err, fromThrowable, ok } from "neverthrow";

export class PostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(
    id: PostId,
  ): Promise<
    Result<Post, AppError<StatusCodeType["NotFound"] | StatusCodeType["InternalServerError"]>>
  > {
    const idOrError = id.toString();
    if (idOrError.isErr()) {
      return err(idOrError.error);
    }
    const record = await this.prisma.post.findUnique({
      where: {
        id: idOrError.value,
      },
    });
    if (record === null) {
      return err(new AppError(StatusCode.InternalServerError, "Not found"));
    }
    return ok(this.mapToPost(record));
  }

  async count(): Promise<number> {
    return await this.prisma.post.count();
  }

  async save(post: Post): Promise<Result<Post, AppError<StatusCodeType["InternalServerError"]>>> {
    if (post.id.value !== null) {
      return err(new AppError(StatusCode.InternalServerError, "Id must be null"));
    }
    const record = await this.prisma.post.create({
      data: {
        profileId: "abcdef",
        title: post.title,
        body: post.body,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
    return ok(this.mapToPost(record));
  }

  async update(post: Post): Promise<Result<Post, AppError<StatusCodeType["InternalServerError"]>>> {
    const idOrError = post.id.toString();
    if (idOrError.isErr()) {
      return err(idOrError.error);
    }
    const record = await this.prisma.post.update({
      where: { id: idOrError.value },
      data: {
        title: post.title,
        body: post.body,
        updatedAt: post.updatedAt,
      },
    });
    return ok(this.mapToPost(record));
  }

  async delete(
    post: Post,
  ): Promise<Result<undefined, AppError<StatusCodeType["InternalServerError"]>>> {
    const idOrError = post.id.toString();
    if (idOrError.isErr()) {
      return err(idOrError.error);
    }
    await this.prisma.post.delete({
      where: { id: idOrError.value },
    });
    return ok(undefined);
  }

  async deleteMultiple(
    ids: PostId[],
  ): Promise<Result<undefined, AppError<StatusCodeType["InternalServerError"]>>> {
    const idsOrError = fromThrowable(
      () =>
        ids.map((id) => {
          const idOrError = id.toString();
          if (idOrError.isErr()) {
            throw new Error();
          }
          return idOrError.value;
        }),
      () => {
        return new AppError(StatusCode.InternalServerError, "Id is null");
      },
    )();
    if (idsOrError.isErr()) {
      return err(idsOrError.error);
    }
    await this.prisma.post.deleteMany({
      where: {
        id: { in: idsOrError.value },
      },
    });
    return ok(undefined);
  }

  private mapToPost({ id, title, body, createdAt, updatedAt }: PostRecord): Post {
    return new Post(new PostId(id), title, body, createdAt, updatedAt);
  }
}
