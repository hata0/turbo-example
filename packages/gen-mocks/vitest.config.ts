import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      enabled: true,
      include: ["./src/**"],
    },
    environment: "node",
    reporters: ["verbose"],
  },
});
