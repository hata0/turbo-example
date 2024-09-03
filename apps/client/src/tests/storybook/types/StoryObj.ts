import { StoryObj as StoryObjPrimitive } from "@storybook/react";

import { Parameters } from "./Parameters";

export type StoryObj<T> = {
  parameters?: Parameters;
} & Omit<StoryObjPrimitive<T>, "parameters">;
