import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import {
  queueActionState,
  resetActionStateMock,
} from "@/tests/component/action-state";
import { PostEditorForm } from "@/features/blog/components/PostEditorForm";

describe("PostEditorForm", () => {
  beforeEach(() => {
    resetActionStateMock();
  });

  it("generates a slug from the title until the slug is edited", async () => {
    const user = userEvent.setup();

    render(<PostEditorForm />);

    await user.type(screen.getByLabelText("Title"), "My Arcade Story");

    expect(screen.getByLabelText("Slug")).toHaveValue("my-arcade-story");

    await user.clear(screen.getByLabelText("Slug"));
    await user.type(screen.getByLabelText("Slug"), "custom-slug");
    await user.clear(screen.getByLabelText("Title"));
    await user.type(screen.getByLabelText("Title"), "Different Title");

    expect(screen.getByLabelText("Slug")).toHaveValue("custom-slug");
  });

  it("renders tag and article previews", async () => {
    const user = userEvent.setup();

    render(<PostEditorForm />);

    await user.type(screen.getByLabelText("Title"), "Preview Post");
    await user.type(screen.getByLabelText("Tags"), "Arcade, Hardware");
    await user.type(
      screen.getByLabelText("Content"),
      "Intro paragraph\n\n## Main Heading",
    );

    expect(
      within(screen.getByLabelText("Tag preview")).getByText("Arcade"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Preview" }));

    expect(screen.getByRole("heading", { name: "Preview Post" })).toBeInTheDocument();
    expect(screen.getByText("Intro paragraph")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Main Heading" })).toBeInTheDocument();
  });

  it("shows field errors and action messages from action state", () => {
    queueActionState({
      ok: false,
      errors: {
        title: ["Title is required."],
        coverImageFile: ["Cover image must be 5MB or smaller."],
      },
      message: "Could not create the post.",
    });

    render(<PostEditorForm />);

    expect(screen.getByText("Title is required.")).toBeInTheDocument();
    expect(screen.getByText("Could not create the post.")).toBeInTheDocument();
    expect(screen.getAllByLabelText("Has errors")).toHaveLength(2);
  });
});
