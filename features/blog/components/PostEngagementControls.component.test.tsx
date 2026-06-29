import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import {
  queueActionState,
  resetActionStateMock,
} from "@/tests/component/action-state";
import { resetMockRouter, router } from "@/tests/component/router";
import { PostEngagementControls } from "@/features/blog/components/PostEngagementControls";

describe("PostEngagementControls", () => {
  beforeEach(() => {
    resetActionStateMock();
    resetMockRouter();
  });

  it("shows a sign-in prompt for guests", () => {
    render(
      <PostEngagementControls
        bookmarkedByCurrentUser={false}
        likedByCurrentUser={false}
        likesCount={4}
        postId="post-1"
        signedIn={false}
      />,
    );

    expect(screen.getByText("4 likes")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sign in to like or save" }),
    ).toHaveAttribute("href", "/login");
  });

  it("renders active signed-in controls", () => {
    render(
      <PostEngagementControls
        bookmarkedByCurrentUser
        likedByCurrentUser
        likesCount={7}
        postId="post-1"
        signedIn
      />,
    );

    expect(screen.getByRole("button", { name: /liked/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("button", { name: /bookmarked/i }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("refreshes the router when an action succeeds", () => {
    queueActionState({ ok: true, resetKey: "like" });
    queueActionState({ ok: false });

    render(
      <PostEngagementControls
        bookmarkedByCurrentUser={false}
        likedByCurrentUser={false}
        likesCount={1}
        postId="post-1"
        signedIn
      />,
    );

    expect(router.refresh).toHaveBeenCalled();
  });
});
