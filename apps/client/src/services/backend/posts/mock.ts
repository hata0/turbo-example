import { HttpResponse } from "msw";

import { createPath, PostsData } from ".";

import { httpHandlerFactory } from "@/libs/msw/httpHandlerFactory";
import { POSTS } from "@/tests/mocks/posts";

const path = createPath();

export const getPostsHandler = httpHandlerFactory("get", path, () => {
  return HttpResponse.json({ posts: POSTS } satisfies PostsData);
});
