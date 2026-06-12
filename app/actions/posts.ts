"use server";

import { revalidatePath } from "next/cache";

import {
  deletePostSchema,
  postSchema,
  updatePostSchema,
} from "@/lib/validation";
import {
  createPost,
  deletePost,
  updatePost,
} from "@/data/posts";
import type { ActionState } from "@/app/actions/comments";

const actionError = (message: string): ActionState => ({
  ok: false,
  message,
});

const booleanFromForm = (value: FormDataEntryValue | null) => {
  return value === "on" || value === "true";
};

export async function createPostAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    published: booleanFromForm(formData.get("published")),
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await createPost(parsed.data);
    revalidatePath("/");
    revalidatePath("/account");
    revalidatePath(`/blog/${parsed.data.slug}`);
    return { ok: true, resetKey: parsed.data.slug };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Sign in before creating a post.");
    }

    if (error instanceof Error && error.message === "Forbidden") {
      return actionError("Only admins can create posts.");
    }

    return actionError("Could not create the post.");
  }
}

export async function updatePostAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = updatePostSchema.safeParse({
    postId: formData.get("postId"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    published: booleanFromForm(formData.get("published")),
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const { postId, ...postInput } = parsed.data;
    await updatePost(postId, postInput);
    revalidatePath("/");
    revalidatePath(`/blog/${postInput.slug}`);
    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Sign in before editing a post.");
    }

    if (error instanceof Error && error.message === "Forbidden") {
      return actionError("Only admins can edit posts.");
    }

    return actionError("Could not update the post.");
  }
}

export async function deletePostAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = deletePostSchema.safeParse({
    postId: formData.get("postId"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await deletePost(parsed.data.postId);
    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Sign in before deleting a post.");
    }

    if (error instanceof Error && error.message === "Forbidden") {
      return actionError("Only admins can delete posts.");
    }

    return actionError("Could not delete the post.");
  }
}
