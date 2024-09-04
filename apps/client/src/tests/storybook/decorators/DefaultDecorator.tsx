import type { ReactRenderer } from "@storybook/react";
import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import type { Args, PartialStoryFn } from "storybook/internal/types";

export const DefaultDecorator = (Story: PartialStoryFn<ReactRenderer, Args>) => {
  const client = getQueryClient();

  // ストーリーを切り替えたときに、残っているデータを削除してリセットする
  useEffect(() => {
    browserQueryClient = undefined;
  }, []);

  return (
    <QueryClientProvider client={client}>
      <Story />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};
