import { vi } from "vitest";

export const router = {
  push: vi.fn(),
  refresh: vi.fn(),
};

export const resetMockRouter = () => {
  router.push.mockReset();
  router.refresh.mockReset();
};
