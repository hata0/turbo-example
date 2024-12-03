import { defineConfig } from "orval";

const openapiDocs = "http://localhost:8787/doc";

export default defineConfig({
  api: {
    input: {
      target: openapiDocs,
    },
    output: {
      mode: "tags-split",
      target: "src/gen/api",
      schemas: "src/gen/api/model",
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      mock: true,
      override: {
        query: {
          useSuspenseQuery: true,
          version: 5,
        },
        mutator: {
          path: "src/utils/fetcher.ts",
          name: "fetcher",
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
  zod: {
    input: {
      target: openapiDocs,
    },
    output: {
      mode: "tags-split",
      target: "src/gen/api",
      client: "zod",
      fileExtension: ".zod.ts",
    },
  },
});
