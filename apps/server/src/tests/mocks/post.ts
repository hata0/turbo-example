import { PostId } from "@/domain/model/post";
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
