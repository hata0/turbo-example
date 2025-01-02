import type { BasePaginationQueryServiceDto } from "@/application/query-service/base";
import { faker } from "@faker-js/faker";

export const createBasePaginationDtoMock = (): BasePaginationQueryServiceDto => {
  const currentPage = faker.number.int({ min: 1, max: 100 });
  const totalCount = faker.number.int({ min: currentPage, max: 1000 });
  const totalPage = faker.number.int({ min: currentPage, max: totalCount });

  return { currentPage, totalCount, totalPage };
};
