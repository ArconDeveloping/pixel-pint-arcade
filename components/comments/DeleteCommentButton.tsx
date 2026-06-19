"use client";

import { useActionState } from "react";

import { deleteCommentAction } from "@/app/actions/comments";
import type { ActionState } from "@/app/actions/comments";
import styles from "./Comments.module.css";

type DeleteCommentButtonProps = {
  commentId: string;
  postSlug: string;
};

const initialState: ActionState = {
  ok: false,
};

export const DeleteCommentButton = ({
  commentId,
  postSlug,
}: DeleteCommentButtonProps) => {
  const [state, formAction, pending] = useActionState(
    deleteCommentAction,
    initialState,
  );

  return (
    <form className={styles.deleteForm} action={formAction}>
      <input name="commentId" type="hidden" value={commentId} />
      <input name="postSlug" type="hidden" value={postSlug} />
      <button type="submit" disabled={pending}>
        {pending ? "Removing..." : "Delete"}
      </button>
      {state.message ? <span className={styles.error}>{state.message}</span> : null}
    </form>
  );
};
