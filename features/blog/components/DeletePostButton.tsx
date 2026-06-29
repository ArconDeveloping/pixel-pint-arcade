"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { deletePostAction } from "@/features/blog/actions/posts";
import type { ActionState } from "@/lib/action-state";
import styles from "./DeletePostButton.module.css";

type DeletePostButtonProps = {
  postId: string;
  postTitle: string;
};

const initialState: ActionState = {
  ok: false,
};

export const DeletePostButton = ({
  postId,
  postTitle,
}: DeletePostButtonProps) => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    deletePostAction,
    initialState,
  );

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form
      action={formAction}
      className={styles.form}
      onSubmit={(event) => {
        if (!window.confirm(`Delete "${postTitle}"?`)) {
          event.preventDefault();
        }
      }}
    >
      <input name="postId" type="hidden" value={postId} />
      <button className={styles.button} disabled={pending} type="submit">
        {pending ? "Deleting..." : "Delete"}
      </button>
      {state.message ? <span className={styles.error}>{state.message}</span> : null}
    </form>
  );
};
