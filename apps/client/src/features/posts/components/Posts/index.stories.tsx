import { PostsResponse } from "@packages/openapi/generated";
import { HttpResponse } from "msw";

import { Posts } from ".";

import { getPostsHandler } from "@/services/backend/posts/mock";
import { Meta } from "@/tests/storybook/types/Meta";
import { StoryObj } from "@/tests/storybook/types/StoryObj";

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
