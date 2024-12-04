import { getGetPostsMockHandler } from "@/gen/api/post/post.msw";
import type { Meta } from "@/tests/storybook/types/Meta";
import type { StoryObj } from "@/tests/storybook/types/StoryObj";
import { Posts } from ".";

type T = typeof Posts;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        getGetPostsMockHandler({
          pagination: {
            currentPage: 1,
            totalCount: 0,
            totalPage: 0,
          },
          posts: [],
        }),
      ],
    },
  },
};

export default {
  component: Posts,
  parameters: {
    msw: {
      handlers: [getGetPostsMockHandler()],
    },
  },
  title: "Features/posts/Posts",
} satisfies Meta<T>;
