import { spawn } from "node:child_process";
import { config } from "dotenv";

config({ path: ".env.test", quiet: true });

if (process.env.DATABASE_TEST_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
}

if (!process.env.DATABASE_URL?.includes("_test")) {
  throw new Error("E2E tests must use a test database");
}

const child = spawn("npx", ["next", "start", "-p", "3100"], {
  env: {
    ...process.env,
  },
  stdio: "inherit",
});

const stop = () => {
  child.kill("SIGTERM");
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);

child.on("exit", (code, signal) => {
  if (signal) {
    process.exit(0);
  }

  process.exit(code ?? 1);
});
