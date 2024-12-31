import { AppError, StatusCode, type StatusCodeType } from "@/core/error";
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

export class ListPostQueryServiceInput extends BasePaginationQueryServiceInput {
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

export class ListPostPaginationQueryServiceDto extends BasePaginationQueryServiceDto {}

export class ListPostQueryServiceDto implements PostsResponse {
  private constructor(
    public readonly posts: PostsResponse["posts"],
    public readonly pagination: ListPostPaginationQueryServiceDto,
  ) {}

  static create(
    posts: Post[],
    input: ListPostQueryServiceInput,
    totalCount: number,
  ): Result<ListPostQueryServiceDto, AppError<StatusCodeType["InternalServerError"]>> {
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
    return ok(
      new ListPostQueryServiceDto(
        postsOrError.value,
        new ListPostPaginationQueryServiceDto(input, totalCount),
      ),
    );
  }
}

export type IListPostHttpQueryService = {
  exec: (
    input: ListPostQueryServiceInput,
  ) => Promise<Result<PostsResponse, AppError<StatusCodeType["InternalServerError"]>>>;
};

export class ListPostHttpQueryService implements IListPostHttpQueryService {
  constructor(private readonly postRepository: IPostRepository) {}

  async exec(
    input: ListPostQueryServiceInput,
  ): Promise<Result<PostsResponse, AppError<StatusCodeType["InternalServerError"]>>> {
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
    const dtoOrError = ListPostQueryServiceDto.create(posts, input, totalCount);
    if (dtoOrError.isErr()) {
      return err(dtoOrError.error);
    }

    return ok(dtoOrError.value);
  }
}
