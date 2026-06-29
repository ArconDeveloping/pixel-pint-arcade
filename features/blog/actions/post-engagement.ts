"use server";

import { revalidatePath } from "next/cache";

import { togglePostBookmark, togglePostLike } from "@/features/blog/data/post-engagement";
import type { ActionState } from "@/lib/action-state";

const actionError = (message: string): ActionState => ({
  ok: false,
  message,
});

const postIdFromForm = (formData: FormData) => {
  const postId = formData.get("postId");

  if (typeof postId !== "string" || !postId) {
    throw new Error("Invalid post");
  }

  return postId;
};

export async function togglePostLikeAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const result = await togglePostLike(postIdFromForm(formData));

    revalidatePath("/account");
    revalidatePath("/blog");
    revalidatePath(`/blog/${result.slug}`);

    return { ok: true, resetKey: String(Date.now()) };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Sign in before liking posts.");
    }

    if (error instanceof Error && error.message === "Post not found") {
      return actionError("This post is not available.");
    }

    return actionError("Could not update the like.");
  }
}

export async function togglePostBookmarkAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const result = await togglePostBookmark(postIdFromForm(formData));

    revalidatePath("/account");
    revalidatePath("/blog");
    revalidatePath(`/blog/${result.slug}`);

    return { ok: true, resetKey: String(Date.now()) };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Sign in before saving posts.");
    }

    if (error instanceof Error && error.message === "Post not found") {
      return actionError("This post is not available.");
    }

    return actionError("Could not update the bookmark.");
  }
}
