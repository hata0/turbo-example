"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getPostsQueryHandler } from "@/services/backend/posts/query";

export const Posts = () => {
  const {
    data: { posts },
  } = useSuspenseQuery(getPostsQueryHandler());

  return (
    <div>
      <div>投稿一覧</div>
      {posts.map((post, index) => (
        <div key={index}>
          <div>{post.name}</div>
          <div>{post.title}</div>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
};
