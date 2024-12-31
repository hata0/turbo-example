import type { PostId } from "@/domain/model/post";

export type ICreatePostCommand = {
  getPostTitle: () => string;
  getPostBody: () => string;
};

export type IEditPostCommand = {
  getPostId: () => PostId;
  getPostTitle: () => string;
  getPostBody: () => string;
};

export type IDeletePostCommand = {
  getPostId: () => PostId;
};

export type IDeleteMultiplePostCommand = {
  getPostIds: () => PostId[];
};
