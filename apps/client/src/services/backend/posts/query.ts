import { queryHandlerFactory } from "@/libs/tanstack-query/queryHandlerFactory";
import type { PostsResponse } from "@packages/openapi";
import { getPosts } from ".";

export const getPostsQueryHandler = queryHandlerFactory<PostsResponse>({
  queryFn: getPosts,
  queryKey: ["posts"],
});
