"use server";

import { revalidatePath } from "next/cache";

import {
  commentSchema,
  deleteCommentSchema,
} from "@/lib/validation";
import {
  createComment,
  deleteComment,
} from "@/data/comments";

export type ActionState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
  resetKey?: string;
};

const actionError = (message: string): ActionState => ({
  ok: false,
  message,
});

export async function createCommentAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const website = formData.get("website");

  if (typeof website === "string" && website.trim()) {
    return actionError("Could not publish the comment.");
  }

  const parsed = commentSchema.safeParse({
    postId: formData.get("postId"),
    parentId: formData.get("parentId") || null,
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await createComment(parsed.data);
    const postSlug = formData.get("postSlug");

    if (typeof postSlug === "string" && postSlug) {
      revalidatePath(`/blog/${postSlug}`);
    }

    return { ok: true, resetKey: String(Date.now()) };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Sign in before posting a comment.");
    }

    if (error instanceof Error && error.message === "Post not found") {
      return actionError("This post is not available for comments.");
    }

    if (error instanceof Error && error.message === "Comments closed") {
      return actionError("Comments are closed for this post.");
    }

    if (error instanceof Error && error.message === "Comment rate limited") {
      return actionError("Please wait before posting another comment.");
    }

    if (error instanceof Error && error.message === "Duplicate comment") {
      return actionError("You already posted this comment.");
    }

    if (error instanceof Error && error.message === "Too many comment links") {
      return actionError("Comments can include up to 2 links.");
    }

    return actionError("Could not publish the comment.");
  }
}

export async function deleteCommentAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = deleteCommentSchema.safeParse({
    commentId: formData.get("commentId"),
    postSlug: formData.get("postSlug") || undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await deleteComment(parsed.data.commentId);

    if (parsed.data.postSlug) {
      revalidatePath(`/blog/${parsed.data.postSlug}`);
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Sign in before deleting a comment.");
    }

    if (error instanceof Error && error.message === "Forbidden") {
      return actionError("You can delete only your own comments.");
    }

    return actionError("Could not delete the comment.");
  }
}
