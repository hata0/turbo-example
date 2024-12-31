import { AppError, type Status, StatusCode } from "@/core/error";
import { Post, PostId } from "@/domain/model/post";
import type { IPostRepository } from "@/domain/repository/post";
import type { PostsResponse } from "@/openapi/schemas/post";
import { type Prisma, PrismaClient } from "@prisma/client";
import { type Result, err, fromThrowable, ok } from "neverthrow";
import { BasePaginationQueryServiceDto, BasePaginationQueryServiceInput } from "../../base";

export const PostSortPattern = {
  Newest: "newest",
  Oldest: "oldest",
} as const;

export type PostSortPatternType = (typeof PostSortPattern)[keyof typeof PostSortPattern];

export class ListPostHttpQueryServiceInput extends BasePaginationQueryServiceInput {
  constructor(
    public readonly limit: number,
    public readonly page: number,
    public readonly sort: PostSortPatternType,
  ) {
    super(limit, page);
  }

  getOrderBy(): { createdAt: Prisma.SortOrder } {
    switch (this.sort) {
      case PostSortPattern.Newest:
        return { createdAt: "desc" };
      default:
        return { createdAt: "asc" };
    }
  }
}

export class ListPostPaginationHttpQueryServiceDto extends BasePaginationQueryServiceDto {}

export class ListPostHttpQueryServiceDto implements PostsResponse {
  private constructor(
    public readonly posts: PostsResponse["posts"],
    public readonly pagination: ListPostPaginationHttpQueryServiceDto,
  ) {}

  static create(
    posts: Post[],
    pagination: ListPostPaginationHttpQueryServiceDto,
  ): Result<ListPostHttpQueryServiceDto, AppError<Status<"InternalServerError">>> {
    const postsOrError = fromThrowable(
      () =>
        posts.map((p) => {
          const idOrError = p.id.toString();
          if (idOrError.isErr()) {
            throw new Error();
          }
          return {
            id: idOrError.value,
            title: p.title,
            body: p.body,
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
          };
        }),
      () => {
        return new AppError(StatusCode.InternalServerError, "Id is null");
      },
    )();

    if (postsOrError.isErr()) {
      return err(postsOrError.error);
    }
    return ok(new ListPostHttpQueryServiceDto(postsOrError.value, pagination));
  }
}

export type IListPostHttpQueryService = {
  exec: (
    input: ListPostHttpQueryServiceInput,
  ) => Promise<Result<PostsResponse, AppError<Status<"InternalServerError">>>>;
};

export class ListPostHttpQueryService implements IListPostHttpQueryService {
  constructor(private readonly postRepository: IPostRepository) {}

  async exec(
    input: ListPostHttpQueryServiceInput,
  ): Promise<Result<PostsResponse, AppError<Status<"InternalServerError">>>> {
    const prisma = new PrismaClient();

    const postRecords = await prisma.post.findMany({
      skip: input.getSkip(),
      take: input.getTake(),
      orderBy: input.getOrderBy(),
    });
    const posts = postRecords.map((p) => {
      return new Post(new PostId(p.id), p.title, p.body, p.createdAt, p.updatedAt);
    });

    const totalCount = await this.postRepository.count();
    const paginationDto = new ListPostPaginationHttpQueryServiceDto(input, totalCount);
    const dtoOrError = ListPostHttpQueryServiceDto.create(posts, paginationDto);
    if (dtoOrError.isErr()) {
      return err(dtoOrError.error);
    }

    return ok(dtoOrError.value);
  }
}
