import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { Posts } from "@/features/posts/components/Posts";
import { getQueryClient } from "@/libs/tanstack-query/getQueryClient";
import { getPostsQueryHandler } from "@/services/backend/posts/query";

export default function PostsPage() {
  const client = getQueryClient();
  void client.prefetchQuery(getPostsQueryHandler());

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <Posts />
    </HydrationBoundary>
  );
}
