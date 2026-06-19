"use client";

import { useActionState } from "react";

import { createCommentAction } from "@/app/actions/comments";
import type { ActionState } from "@/app/actions/comments";
import styles from "./Comments.module.css";

type CommentFormProps = {
  postId: string;
  postSlug: string;
  parentId?: string | null;
};

const initialState: ActionState = {
  ok: false,
};

type CommentFieldsProps = CommentFormProps & {
  pending: boolean;
  state: ActionState;
};

const CommentFields = ({
  postId,
  postSlug,
  parentId,
  pending,
  state,
}: CommentFieldsProps) => (
  <>
    <input name="postId" type="hidden" value={postId} />
    <input name="postSlug" type="hidden" value={postSlug} />
    {parentId ? <input name="parentId" type="hidden" value={parentId} /> : null}

    <div className={styles.field}>
      <label htmlFor={parentId ? `reply-${parentId}` : "comment-body"}>
        Comment
      </label>
      <textarea
        id={parentId ? `reply-${parentId}` : "comment-body"}
        name="body"
        rows={5}
        required
        maxLength={2000}
        placeholder="Share your take..."
      />
      {state.errors?.body ? <p>{state.errors.body[0]}</p> : null}
    </div>

    <div className={styles.formActions}>
      <button className="btn" type="submit" disabled={pending}>
        {pending ? "Posting..." : "Post comment"}
      </button>
      {state.ok ? <span className={styles.success}>Comment posted.</span> : null}
      {state.message ? <span className={styles.error}>{state.message}</span> : null}
    </div>
  </>
);

export const CommentForm = ({ postId, postSlug, parentId = null }: CommentFormProps) => {
  const [state, formAction, pending] = useActionState(
    createCommentAction,
    initialState,
  );

  return (
    <form className={styles.form} action={formAction}>
      <CommentFields
        key={state.resetKey ?? "comment"}
        postId={postId}
        postSlug={postSlug}
        parentId={parentId}
        pending={pending}
        state={state}
      />
    </form>
  );
};
