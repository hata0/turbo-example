import { Configuration } from "@packages/openapi/generated";

import { BACKEND_URL } from "@/constants/backend-url";

export const baseConfig = new Configuration({
  basePath: BACKEND_URL,
});
