import { getPostsHandler } from "@/services/backend/posts/mock";
import type { Meta } from "@/tests/storybook/types/Meta";
import type { StoryObj } from "@/tests/storybook/types/StoryObj";
import type { PostsResponse } from "@packages/openapi";
import { HttpResponse } from "msw";
import { Posts } from ".";

type T = typeof Posts;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        getPostsHandler({
          resolver: () => {
            return HttpResponse.json({
              posts: [],
            } satisfies PostsResponse);
          },
        }),
      ],
    },
  },
};

export default {
  component: Posts,
  parameters: {
    msw: {
      handlers: [getPostsHandler()],
    },
  },
  title: "Features/posts/Posts",
} satisfies Meta<T>;
