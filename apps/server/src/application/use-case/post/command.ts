import type { PostId } from "@/domain/model/post";

export type CreatePostCommand = {
  getPostTitle: () => string;
  getPostBody: () => string;
};

export type EditPostCommand = {
  getPostId: () => PostId;
  getPostTitle: () => string;
  getPostBody: () => string;
};

export type DeletePostCommand = {
  getPostId: () => PostId;
};

export type DeleteMultiplePostCommand = {
  getPostIds: () => PostId[];
};
