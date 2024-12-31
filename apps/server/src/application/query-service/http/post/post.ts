import type { IListPostHttpQueryService } from "./list";

export type IPostHttpQueryService = {
  list: IListPostHttpQueryService;
};

export class PostHttpQueryService implements IPostHttpQueryService {
  constructor(public readonly list: IListPostHttpQueryService) {}
}
