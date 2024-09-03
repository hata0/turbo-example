import { Meta as MetaPrimitive } from "@storybook/react";

import { Parameters } from "./Parameters";

export type Meta<T> = {
  parameters?: Parameters;
} & Omit<MetaPrimitive<T>, "parameters">;
