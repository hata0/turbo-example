import { PostApi } from "@packages/openapi/generated";

import { BACKEND_URL } from "@/constants/backend-url";
import { baseConfig } from "@/libs/openapi/base-config";

export const createPath = () => `${BACKEND_URL}/posts`;

const postApi = new PostApi(baseConfig);

export const getPosts = () => postApi.postsGet();
