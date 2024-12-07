import { httpHandlerFactory } from "@/tests/msw/httpHandlerFactory";
import { HttpResponse } from "msw";
import { getGetPostsResponseMock } from "./posts.msw";
import { getPostPostsResponseMock } from "./posts.msw";
import { getDeletePostsResponseMock } from "./posts.msw";
import { getGetPostsIdResponseMock } from "./posts.msw";
import { getPutPostsIdResponseMock } from "./posts.msw";
import { getDeletePostsIdResponseMock } from "./posts.msw";

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
