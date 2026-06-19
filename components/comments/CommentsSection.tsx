import Link from "next/link";

import type { CommentDTO } from "@/data/comments";
import { CommentForm } from "./CommentForm";
import { DeleteCommentButton } from "./DeleteCommentButton";
import styles from "./Comments.module.css";

type CommentsSectionProps = {
  comments: CommentDTO[];
  postId: string;
  postSlug: string;
  currentUser:
    | {
        id: string;
        role: "USER" | "ADMIN";
      }
    | null;
};

type CommentNode = CommentDTO & {
  replies: CommentNode[];
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const buildCommentTree = (comments: CommentDTO[]) => {
  const nodes = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  comments.forEach((comment) => {
    nodes.set(comment.id, {
      ...comment,
      replies: [],
    });
  });

  nodes.forEach((node) => {
    if (node.parentId) {
      const parent = nodes.get(node.parentId);

      if (parent) {
        parent.replies.push(node);
        return;
      }
    }

    roots.push(node);
  });

  return roots;
};

const CommentItem = ({
  comment,
  currentUser,
  postSlug,
}: {
  comment: CommentNode;
  currentUser: CommentsSectionProps["currentUser"];
  postSlug: string;
}) => {
  const canDelete =
    currentUser?.role === "ADMIN" || currentUser?.id === comment.author.id;

  return (
    <li className={styles.comment}>
      <article>
        <header className={styles.commentHeader}>
          <div>
            <strong>{comment.author.name}</strong>
            <time dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time>
          </div>
          {canDelete ? (
            <DeleteCommentButton commentId={comment.id} postSlug={postSlug} />
          ) : null}
        </header>
        <p>{comment.body}</p>
      </article>

      {comment.replies.length > 0 ? (
        <ol className={styles.replies}>
          {comment.replies.map((reply) => (
            <CommentItem
              comment={reply}
              currentUser={currentUser}
              key={reply.id}
              postSlug={postSlug}
            />
          ))}
        </ol>
      ) : null}
    </li>
  );
};

export const CommentsSection = ({
  comments,
  currentUser,
  postId,
  postSlug,
}: CommentsSectionProps) => {
  const roots = buildCommentTree(comments);

  return (
    <section className={styles.comments} aria-labelledby="comments-title">
      <div className={styles.header}>
        <div>
          <div className="eyebrow">Discussion</div>
          <h2 id="comments-title">Comments</h2>
        </div>
        <span>{comments.length}</span>
      </div>

      {currentUser ? (
        <CommentForm postId={postId} postSlug={postSlug} />
      ) : (
        <div className={styles.signInPrompt}>
          <h3>Join the discussion</h3>
          <p>Sign in to leave a comment under this article.</p>
          <div className={styles.promptActions}>
            <Link className="btn" href="/login">
              Sign in
            </Link>
            <Link className="btn secondary" href="/register">
              Create account
            </Link>
          </div>
        </div>
      )}

      {roots.length > 0 ? (
        <ol className={styles.list}>
          {roots.map((comment) => (
            <CommentItem
              comment={comment}
              currentUser={currentUser}
              key={comment.id}
              postSlug={postSlug}
            />
          ))}
        </ol>
      ) : (
        <div className={styles.emptyState}>
          <h3>No comments yet</h3>
          <p>Start the conversation with the first take on this post.</p>
        </div>
      )}
    </section>
  );
};
