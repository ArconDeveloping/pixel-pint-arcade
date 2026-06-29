import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import {
  queueActionState,
  resetActionStateMock,
} from "@/tests/component/action-state";
import { DeletePostButton } from "@/features/blog/components/DeletePostButton";

describe("DeletePostButton", () => {
  beforeEach(() => {
    resetActionStateMock();
  });

  it("shows the pending state", () => {
    queueActionState({ ok: false }, { pending: true });

    render(<DeletePostButton postId="post-1" postTitle="Post title" />);

    expect(screen.getByRole("button", { name: "Deleting..." })).toBeDisabled();
  });

  it("shows action errors", () => {
    queueActionState({
      ok: false,
      message: "Could not delete the post.",
    });

    render(<DeletePostButton postId="post-1" postTitle="Post title" />);

    expect(screen.getByText("Could not delete the post.")).toBeInTheDocument();
  });
});
