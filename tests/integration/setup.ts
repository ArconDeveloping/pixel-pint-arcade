import { afterAll, beforeEach } from "vitest";

import { prisma } from "@/db/prisma";
import { cleanupDatabase } from "./cleanup";

if (!process.env.DATABASE_URL?.includes("_test")) {
  throw new Error("Integration tests must use a test database");
}

beforeEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});
