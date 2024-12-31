import { ListPostHttpQueryService } from "@/application/query-service/http/post/list";
import { PostHttpQueryService } from "@/application/query-service/http/post/post";
import { PostUseCase } from "@/application/use-case/post/use-case";
import { PostRepository } from "@/interface/repository/post";
import { PrismaClient } from "@prisma/client";
import { PostHandler } from "../../../interface/handler/post";

export class PostInjector {
  private readonly postUseCase: PostUseCase;
  private readonly postHttpQueryService: PostHttpQueryService;

  constructor() {
    const prisma = new PrismaClient();
    const postRepository = new PostRepository(prisma);

    this.postUseCase = new PostUseCase(postRepository);
    this.postHttpQueryService = new PostHttpQueryService(
      new ListPostHttpQueryService(postRepository),
    );
  }

  get handler(): PostHandler {
    return new PostHandler(this.postUseCase, this.postHttpQueryService);
  }
}
