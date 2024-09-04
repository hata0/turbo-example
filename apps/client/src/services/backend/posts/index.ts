import { BACKEND_URL } from "@/constants/backend-url";
import { baseConfig } from "@/libs/openapi/base-config";
import { PostApi } from "@packages/openapi";

export const createPath = () => `${BACKEND_URL}/posts`;

const postApi = new PostApi(baseConfig);

export const getPosts = () =>
  postApi.postsGet({
    cache: "no-store",
  });
