import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import { initialize, mswLoader } from "msw-storybook-addon";
import { DefaultDecorator } from "../src/tests/storybook/decorators/DefaultDecorator";

initialize({ onUnhandledRequest: "bypass" });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    DefaultDecorator,
  ],
  loaders: [mswLoader],
};

export default preview;
