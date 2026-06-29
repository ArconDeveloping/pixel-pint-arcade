import { describe, expect, it, vi } from "vitest";

import { createTestUser } from "@/tests/integration/factories";

const authMock = vi.hoisted(() => ({
  currentSession: null as null | { user: { id: string } },
}));

vi.mock("@/server/auth", () => ({
  getCurrentSession: vi.fn(async () => authMock.currentSession),
}));

async function loadPermissions() {
  vi.resetModules();

  return import("@/server/permissions");
}

describe("server permissions", () => {
  it("rejects guests", async () => {
    authMock.currentSession = null;
    const { requireUser } = await loadPermissions();

    await expect(requireUser()).rejects.toThrow("Unauthorized");
  });

  it("loads the current user record from the database", async () => {
    const user = await createTestUser({
      id: "permissions-user",
      role: "USER",
    });
    authMock.currentSession = { user: { id: user.id } };
    const { requireUserRecord } = await loadPermissions();

    await expect(requireUserRecord()).resolves.toMatchObject({
      id: user.id,
      role: "USER",
    });
  });

  it("rejects non-admin users for admin-only access", async () => {
    const user = await createTestUser({
      id: "permissions-non-admin",
      role: "USER",
    });
    authMock.currentSession = { user: { id: user.id } };
    const { requireAdmin } = await loadPermissions();

    await expect(requireAdmin()).rejects.toThrow("Forbidden");
  });

  it("allows admin users for admin-only access", async () => {
    const user = await createTestUser({
      id: "permissions-admin",
      role: "ADMIN",
    });
    authMock.currentSession = { user: { id: user.id } };
    const { requireAdmin } = await loadPermissions();

    await expect(requireAdmin()).resolves.toMatchObject({
      id: user.id,
      role: "ADMIN",
    });
  });
});
