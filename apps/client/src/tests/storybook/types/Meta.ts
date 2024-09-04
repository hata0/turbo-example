import type { Meta as MetaPrimitive } from "@storybook/react";

import type { Parameters } from "./Parameters";

export type Meta<T> = {
  parameters?: Parameters;
} & Omit<MetaPrimitive<T>, "parameters">;
