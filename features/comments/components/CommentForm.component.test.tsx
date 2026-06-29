import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  queueActionState,
  resetActionStateMock,
} from "@/tests/component/action-state";
import { CommentForm } from "@/features/comments/components/CommentForm";

describe("CommentForm", () => {
  beforeEach(() => {
    resetActionStateMock();
  });

  it("renders hidden post fields and the root comment textarea", () => {
    render(<CommentForm postId="post-1" postSlug="test-post" />);

    expect(screen.getByLabelText("Comment")).toHaveAttribute(
      "placeholder",
      "Share your take...",
    );
    expect(document.querySelector('input[name="postId"]')).toHaveValue(
      "post-1",
    );
    expect(document.querySelector('input[name="postSlug"]')).toHaveValue(
      "test-post",
    );
  });

  it("renders reply labels when parentId is passed", () => {
    render(
      <CommentForm parentId="comment-1" postId="post-1" postSlug="test-post" />,
    );

    expect(screen.getByLabelText("Reply")).toHaveAttribute(
      "placeholder",
      "Write a reply...",
    );
    expect(screen.getByRole("button", { name: "Post reply" })).toBeEnabled();
    expect(document.querySelector('input[name="parentId"]')).toHaveValue(
      "comment-1",
    );
  });

  it("shows action errors and success state", () => {
    queueActionState({
      ok: false,
      errors: { body: ["Comment is required."] },
      message: "Could not publish the comment.",
    });

    render(<CommentForm postId="post-1" postSlug="test-post" />);

    expect(screen.getByText("Comment is required.")).toBeInTheDocument();
    expect(screen.getByText("Could not publish the comment.")).toBeInTheDocument();
  });

  it("calls onSuccess when the action state is ok", () => {
    const onSuccess = vi.fn();
    queueActionState({ ok: true, resetKey: "posted" });

    render(
      <CommentForm
        onSuccess={onSuccess}
        postId="post-1"
        postSlug="test-post"
      />,
    );

    expect(screen.getByText("Comment posted.")).toBeInTheDocument();
    expect(onSuccess).toHaveBeenCalled();
  });
});
