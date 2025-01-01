import type { IPostRepository } from "@/domain/repository/post";
import { type IListPostHttpQueryService, ListPostHttpQueryService } from "./list";

export type IPostHttpQueryService = {
  list: IListPostHttpQueryService;
};

export class PostHttpQueryService implements IPostHttpQueryService {
  public readonly list: ListPostHttpQueryService;

  constructor(postRepository: IPostRepository) {
    this.list = new ListPostHttpQueryService(postRepository);
  }
}
