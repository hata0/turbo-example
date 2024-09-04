"use client";

import { getPostsQueryHandler } from "@/services/backend/posts/query";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Posts = () => {
  const {
    data: { posts },
  } = useSuspenseQuery(getPostsQueryHandler());

  return (
    <div>
      <div>投稿一覧</div>
      {posts.map((post, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index}>
          <div>{post.name}</div>
          <div>{post.title}</div>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
};
