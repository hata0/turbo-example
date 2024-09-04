import { BACKEND_URL } from "@/constants/backend-url";
import { Configuration } from "@packages/openapi";

export const baseConfig = new Configuration({
  basePath: BACKEND_URL,
});
