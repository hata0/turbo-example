import { defineConfig } from "orval";

const INPUT = "http://localhost:8787/doc";
const OUTPUT = "src/gen/api";

export default defineConfig({
  api: {
    input: {
      target: INPUT,
    },
    output: {
      mode: "tags-split",
      target: OUTPUT,
      schemas: `${OUTPUT}/model`,
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
          path: "src/libs/openapi/fetcher.ts",
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
      target: INPUT,
    },
    output: {
      mode: "tags-split",
      target: OUTPUT,
      client: "zod",
      fileExtension: ".zod.ts",
    },
  },
});
