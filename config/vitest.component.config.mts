import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "server-only": path.resolve("tests/integration/server-only.ts"),
    },
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    include: ["**/*.component.test.tsx"],
    setupFiles: ["./tests/component/setup.ts"],
  },
});
