"use client";

import type { GetPostsParams } from "@/gen/api/model";
import { useGetPostsSuspense } from "@/gen/api/posts/posts";

type Props = {
  query: GetPostsParams;
};

export const Posts = ({ query }: Props) => {
  const {
    data: { posts },
  } = useGetPostsSuspense(query);

  return (
    <div>
      <div>投稿一覧</div>
      {posts.map((post, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index}>
          <div>{post.title}</div>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
};
