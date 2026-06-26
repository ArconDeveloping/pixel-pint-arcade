"use client";

import { useActionState, useEffect } from "react";

import { createCommentAction } from "@/app/actions/comments";
import type { ActionState } from "@/app/actions/comments";
import styles from "./Comments.module.css";

type CommentFormProps = {
  postId: string;
  postSlug: string;
  parentId?: string | null;
  label?: string;
  submitLabel?: string;
  pendingLabel?: string;
  placeholder?: string;
  className?: string;
  onSuccess?: () => void;
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
  label = parentId ? "Reply" : "Comment",
  submitLabel = parentId ? "Post reply" : "Post comment",
  pendingLabel = parentId ? "Replying..." : "Posting...",
  placeholder = parentId ? "Write a reply..." : "Share your take...",
  pending,
  state,
}: CommentFieldsProps) => (
  <>
    <input name="postId" type="hidden" value={postId} />
    <input name="postSlug" type="hidden" value={postSlug} />
    {parentId ? <input name="parentId" type="hidden" value={parentId} /> : null}
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor={parentId ? `reply-${parentId}-website` : "comment-website"}>
        Website
      </label>
      <input
        autoComplete="off"
        id={parentId ? `reply-${parentId}-website` : "comment-website"}
        name="website"
        tabIndex={-1}
        type="text"
      />
    </div>

    <div className={styles.field}>
      <label htmlFor={parentId ? `reply-${parentId}` : "comment-body"}>
        {label}
      </label>
      <textarea
        id={parentId ? `reply-${parentId}` : "comment-body"}
        name="body"
        rows={5}
        required
        maxLength={2000}
        placeholder={placeholder}
      />
      {state.errors?.body ? <p>{state.errors.body[0]}</p> : null}
    </div>

    <div className={styles.formActions}>
      <button className="btn" type="submit" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </button>
      {state.ok ? <span className={styles.success}>Comment posted.</span> : null}
      {state.message ? <span className={styles.error}>{state.message}</span> : null}
    </div>
  </>
);

export const CommentForm = ({
  postId,
  postSlug,
  parentId = null,
  className,
  onSuccess,
  ...fieldProps
}: CommentFormProps) => {
  const [state, formAction, pending] = useActionState(
    createCommentAction,
    initialState,
  );
  const formClassName = className ? `${styles.form} ${className}` : styles.form;

  useEffect(() => {
    if (state.ok) {
      onSuccess?.();
    }
  }, [onSuccess, state.ok, state.resetKey]);

  return (
    <form className={formClassName} action={formAction}>
      <CommentFields
        key={state.resetKey ?? `comment-${parentId ?? "root"}`}
        postId={postId}
        postSlug={postSlug}
        parentId={parentId}
        pending={pending}
        state={state}
        {...fieldProps}
      />
    </form>
  );
};
