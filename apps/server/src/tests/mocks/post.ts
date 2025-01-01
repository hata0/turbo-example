import { PostSortPattern } from "@/application/query-service/http/post/list";
import { PostId } from "@/domain/model/post";
import { objectValuesToArray } from "@/utils/array";
import { faker } from "@faker-js/faker";

export const createPostMock = () => {
  const updatedAt = faker.date.past();

  return {
    id: new PostId(faker.string.uuid()),
    title: faker.string.alpha({ length: { min: 5, max: 20 } }),
    body: faker.lorem.lines(),
    createdAt: faker.date.past({ refDate: updatedAt }),
    updatedAt,
  };
};

export const createListPostInputMock = () => {
  const limit = faker.number.int({ min: 1, max: 40 });
  const page = faker.number.int({ min: 1, max: 50 });
  const sort = faker.helpers.arrayElement(objectValuesToArray(PostSortPattern, (s) => s));

  return { limit, page, sort };
};
