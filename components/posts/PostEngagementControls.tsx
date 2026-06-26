"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  togglePostBookmarkAction,
  togglePostLikeAction,
} from "@/app/actions/post-engagement";
import type { ActionState } from "@/app/actions/comments";
import styles from "./PostEngagementControls.module.css";

type PostEngagementControlsProps = {
  bookmarkedByCurrentUser: boolean;
  likedByCurrentUser: boolean;
  likesCount: number;
  postId: string;
  signedIn: boolean;
};

const initialState: ActionState = {
  ok: false,
};

export const PostEngagementControls = ({
  bookmarkedByCurrentUser,
  likedByCurrentUser,
  likesCount,
  postId,
  signedIn,
}: PostEngagementControlsProps) => {
  const router = useRouter();
  const [likeState, likeAction, likePending] = useActionState(
    togglePostLikeAction,
    initialState,
  );
  const [bookmarkState, bookmarkAction, bookmarkPending] = useActionState(
    togglePostBookmarkAction,
    initialState,
  );

  useEffect(() => {
    if (likeState.ok || bookmarkState.ok) {
      router.refresh();
    }
  }, [
    bookmarkState.ok,
    bookmarkState.resetKey,
    likeState.ok,
    likeState.resetKey,
    router,
  ]);

  if (!signedIn) {
    return (
      <div className={styles.engagement} aria-label="Post actions">
        <span className={styles.count}>{likesCount} likes</span>
        <Link className={styles.authLink} href="/login">
          Sign in to like or save
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.engagement} aria-label="Post actions">
      <form action={likeAction}>
        <input name="postId" type="hidden" value={postId} />
        <button
          aria-pressed={likedByCurrentUser}
          className={`${styles.action} ${
            likedByCurrentUser ? styles.activeAction : ""
          }`}
          disabled={likePending}
          type="submit"
        >
          {likedByCurrentUser ? "Liked" : "Like"}
          <span>{likesCount}</span>
        </button>
      </form>
      <form action={bookmarkAction}>
        <input name="postId" type="hidden" value={postId} />
        <button
          aria-pressed={bookmarkedByCurrentUser}
          className={`${styles.action} ${
            bookmarkedByCurrentUser ? styles.activeAction : ""
          }`}
          disabled={bookmarkPending}
          type="submit"
        >
          {bookmarkedByCurrentUser ? "Bookmarked" : "Add to bookmarks"}
        </button>
      </form>
      {likeState.message ? (
        <span className={styles.error}>{likeState.message}</span>
      ) : null}
      {bookmarkState.message ? (
        <span className={styles.error}>{bookmarkState.message}</span>
      ) : null}
    </div>
  );
};
