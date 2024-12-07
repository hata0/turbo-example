import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { Posts } from "@/features/posts/components/Posts";
import { getQueryClient } from "@/libs/tanstack-query/getQueryClient";
import type { SearchParams } from "nuqs";

import { getGetPostsSuspenseQueryOptions } from "@/gen/api/posts/posts";
import { createSearchParamsCache, parseAsInteger, parseAsStringLiteral } from "nuqs/server";

const sort = ["latest", "oldest"] as const;

export const searchParamsParsers = {
  sort: parseAsStringLiteral(sort).withDefault("latest"),
  page: parseAsInteger.withDefault(1),
};
export const searchParamsCache = createSearchParamsCache(searchParamsParsers);

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function PostsPage({ searchParams }: Props) {
  const { sort, page } = await searchParamsCache.parse(searchParams);
  const client = getQueryClient();
  const query = {
    sort,
    limit: 10,
    page,
  };
  void client.prefetchQuery(getGetPostsSuspenseQueryOptions(query));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <Posts query={query} />
    </HydrationBoundary>
  );
}
