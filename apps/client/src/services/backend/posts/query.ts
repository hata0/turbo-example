import type { PostsResponse } from "@packages/openapi/generated";

import { getPosts } from ".";

import { queryHandlerFactory } from "@/libs/tanstack-query/queryHandlerFactory";

export const getPostsQueryHandler = queryHandlerFactory<PostsResponse>({
  queryFn: getPosts,
  queryKey: ["posts"],
});
