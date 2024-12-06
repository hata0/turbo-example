import { httpHandlerFactory } from "@/libs/msw/httpHandlerFactory";
import { HttpResponse } from "msw";
import { getGetPostsResponseMock } from "./post.msw";
import { getPostPostsResponseMock } from "./post.msw";
import { getDeletePostsResponseMock } from "./post.msw";
import { getGetPostsIdResponseMock } from "./post.msw";
import { getPutPostsIdResponseMock } from "./post.msw";
import { getDeletePostsIdResponseMock } from "./post.msw";

export const getGetPostsMockHandler = httpHandlerFactory("get", "*/posts", () => {
  return HttpResponse.json(getGetPostsResponseMock());
});

export const getPostPostsMockHandler = httpHandlerFactory("post", "*/posts", () => {
  return HttpResponse.json(getPostPostsResponseMock());
});

export const getDeletePostsMockHandler = httpHandlerFactory("delete", "*/posts", () => {
  return HttpResponse.json(getDeletePostsResponseMock());
});

export const getGetPostsIdMockHandler = httpHandlerFactory("get", "*/posts/:id", () => {
  return HttpResponse.json(getGetPostsIdResponseMock());
});

export const getPutPostsIdMockHandler = httpHandlerFactory("put", "*/posts/:id", () => {
  return HttpResponse.json(getPutPostsIdResponseMock());
});

export const getDeletePostsIdMockHandler = httpHandlerFactory("delete", "*/posts/:id", () => {
  return HttpResponse.json(getDeletePostsIdResponseMock());
});
