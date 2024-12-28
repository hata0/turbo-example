import nodePlop from "node-plop";
import { expect, it } from "vitest";
import generator from "../src";

it("loads generator", async () => {
  const plop = await nodePlop("tests/utils/plopfile.js");
  expect(await generator(plop)).toBeUndefined();
});
