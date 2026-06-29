import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

import { actionStateMock } from "./action-state";
import { router } from "./router";

afterEach(() => {
  cleanup();
});

vi.mock("@/features/blog/actions/posts", () => ({
  createPostAction: vi.fn(),
  updatePostAction: vi.fn(),
}));

vi.mock("@/features/blog/actions/post-engagement", () => ({
  togglePostBookmarkAction: vi.fn(),
  togglePostLikeAction: vi.fn(),
}));

vi.mock("@/features/comments/actions/comments", () => ({
  createCommentAction: vi.fn(),
  deleteCommentAction: vi.fn(),
}));

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();

  return {
    ...actual,
    useActionState: vi.fn(() => {
      return (
        actionStateMock.queue.shift() ?? [
          { ok: false },
          actionStateMock.defaultAction,
          false,
        ]
      );
    }),
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => router,
  usePathname: () => "/",
}));

vi.mock("next/link", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    }) => React.createElement("a", { href, ...props }, children),
  };
});
