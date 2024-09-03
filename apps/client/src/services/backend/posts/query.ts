import { getPosts, PostsData } from ".";

import { queryHandlerFactory } from "@/libs/tanstack-query/queryHandlerFactory";

export const getPostsQueryHandler = queryHandlerFactory<PostsData>({
  queryFn: getPosts,
  queryKey: ["posts"],
});
