import { spawnSync } from "node:child_process";
import { config } from "dotenv";

config({ path: ".env.test", quiet: true });

if (process.env.DATABASE_TEST_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
}

if (!process.env.DATABASE_URL?.includes("_test")) {
  throw new Error("E2E tests must use a test database");
}

const result = spawnSync("npx", ["next", "build"], {
  env: process.env,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
