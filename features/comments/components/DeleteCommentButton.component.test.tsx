import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import {
  queueActionState,
  resetActionStateMock,
} from "@/tests/component/action-state";
import { DeleteCommentButton } from "@/features/comments/components/DeleteCommentButton";

describe("DeleteCommentButton", () => {
  beforeEach(() => {
    resetActionStateMock();
  });

  it("shows the pending state", () => {
    queueActionState({ ok: false }, { pending: true });

    render(<DeleteCommentButton commentId="comment-1" postSlug="test-post" />);

    expect(screen.getByRole("button", { name: "Removing..." })).toBeDisabled();
  });

  it("shows action errors", () => {
    queueActionState({
      ok: false,
      message: "Could not delete the comment.",
    });

    render(<DeleteCommentButton commentId="comment-1" postSlug="test-post" />);

    expect(screen.getByText("Could not delete the comment.")).toBeInTheDocument();
  });
});
