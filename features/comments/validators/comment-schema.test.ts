import { describe, expect, it } from "vitest";

import {
  commentSchema,
  deleteCommentSchema,
} from "@/features/comments/validators/comment-schema";

describe("commentSchema", () => {
  it("accepts a valid comment", () => {
    expect(
      commentSchema.safeParse({
        postId: "post-1",
        parentId: null,
        body: "This is a useful comment.",
      }).success,
    ).toBe(true);
  });

  it("rejects empty body after trimming", () => {
    expect(
      commentSchema.safeParse({
        postId: "post-1",
        body: "   \n",
      }).success,
    ).toBe(false);
  });

  it("rejects body longer than 2000 characters", () => {
    expect(
      commentSchema.safeParse({
        postId: "post-1",
        body: "a".repeat(2001),
      }).success,
    ).toBe(false);
  });
});

describe("deleteCommentSchema", () => {
  it("requires commentId and allows optional postSlug", () => {
    expect(
      deleteCommentSchema.safeParse({
        commentId: "comment-1",
        postSlug: "post-slug",
      }).success,
    ).toBe(true);
    expect(deleteCommentSchema.safeParse({ commentId: "" }).success).toBe(
      false,
    );
  });
});
