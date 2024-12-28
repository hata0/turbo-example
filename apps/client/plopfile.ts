import type { NodePlopAPI } from "plop";

export default async function (plop: NodePlopAPI) {
  await plop.load("@packages/gen-mocks");
}
