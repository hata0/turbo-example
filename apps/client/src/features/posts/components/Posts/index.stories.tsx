import { getGetPostsMockHandler } from "@/gen/api/posts/mock";
import type { Meta } from "@/tests/storybook/types/Meta";
import type { StoryObj } from "@/tests/storybook/types/StoryObj";
import { HttpResponse } from "msw";
import { Posts } from ".";

type T = typeof Posts;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        getGetPostsMockHandler({
          resolver: () => {
            return HttpResponse.json({
              pagination: {
                currentPage: 1,
                totalCount: 0,
                totalPage: 0,
              },
              posts: [],
            });
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
      handlers: [getGetPostsMockHandler()],
    },
  },
  title: "Features/posts/Posts",
} satisfies Meta<T>;
