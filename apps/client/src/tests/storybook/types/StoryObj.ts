import type { StoryObj as StoryObjPrimitive } from "@storybook/react";

import type { Parameters } from "./Parameters";

export type StoryObj<T> = {
  parameters?: Parameters;
} & Omit<StoryObjPrimitive<T>, "parameters">;
