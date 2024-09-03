import { HttpResponse } from "msw";

import { createPath } from ".";

import { httpHandlerFactory } from "@/libs/msw/httpHandlerFactory";
import { POSTS_RESPONSE } from "@/tests/mocks/posts-response";

const path = createPath();

export const getPostsHandler = httpHandlerFactory("get", path, () => {
  return HttpResponse.json(POSTS_RESPONSE);
});
