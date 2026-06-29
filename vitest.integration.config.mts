import { config } from "dotenv";
import { defineConfig } from "vitest/config";

config({ path: ".env.test", quiet: true });

if (process.env.DATABASE_TEST_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["**/*.integration.test.ts"],
    passWithNoTests: true,
    setupFiles: ["./tests/integration/setup.ts"],
  },
});
