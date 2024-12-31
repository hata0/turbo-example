export abstract class BasePaginationQueryServiceInput {
  constructor(
    public readonly limit: number,
    public readonly page: number,
  ) {}

  getSkip(): number {
    return this.limit * (this.page - 1);
  }

  getTake(): number {
    return this.limit;
  }
}

export abstract class BasePaginationQueryServiceDto {
  public readonly currentPage: number;
  public readonly totalCount: number;
  public readonly totalPage: number;

  constructor(input: BasePaginationQueryServiceInput, totalCount: number) {
    this.currentPage = input.page;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / input.limit);
  }
}
