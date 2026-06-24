import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { getCurrentSession, requireUserRecord } from "@/data/auth";
import { getCurrentUserComments } from "@/data/comments";
import { getCurrentUserPosts } from "@/data/posts";
import styles from "./AccountPage.module.css";

export const metadata: Metadata = {
  title: "Account | Pixel Pint Arcade",
  description: "Your Pixel Pint Arcade posts, comments and profile.",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const previewText = (value: string) =>
  value.length > 150 ? `${value.slice(0, 147).trim()}...` : value;

export default async function AccountPage() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await requireUserRecord();
  const isAdmin = user.role === "ADMIN";
  const [posts, comments] = await Promise.all([
    isAdmin ? getCurrentUserPosts() : Promise.resolve([]),
    getCurrentUserComments(),
  ]);

  return (
    <main className="page-shell">
      <div className="wrap">
        <div className={`page-topline ${styles.topline}`}>
          <Link className="pixel-link" href="/">
            Back home
          </Link>
          <SignOutButton className={`pixel-link ${styles.signOut}`} />
        </div>

        <section className={styles.hero}>
          <div className={styles.avatar} aria-hidden="true">
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="eyebrow">Account</div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </section>

        <nav className={styles.tabs} aria-label="Account sections">
          {isAdmin ? <Link href="/account/posts/new">Write post</Link> : null}
          {isAdmin ? <a href="#posts">My posts</a> : null}
          <a href="#comments">My comments</a>
        </nav>

        {isAdmin ? (
          <section className={styles.section} id="posts">
            <div className={styles.sectionHeader}>
              <h2>My posts</h2>
              <span>{posts.length}</span>
            </div>

            {posts.length > 0 ? (
              <div className={styles.list}>
                {posts.map((post) => (
                  <article className={styles.item} key={post.id}>
                    <div className={styles.itemMeta}>
                      <span className={post.published ? styles.published : styles.draft}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>
                    </div>
                    <h3>
                      {post.published ? (
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      ) : (
                        post.title
                      )}
                    </h3>
                    {post.excerpt ? <p>{post.excerpt}</p> : null}
                    {post.tags.length > 0 ? (
                      <div className={`tag-list ${styles.tags}`} aria-label="Post tags">
                        {post.tags.map((tag) => (
                          <span className="tag-chip" key={tag.slug}>{tag.name}</span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3>No posts yet</h3>
                <p>Your authored posts will appear here after you create them.</p>
              </div>
            )}
          </section>
        ) : null}

        <section className={styles.section} id="comments">
          <div className={styles.sectionHeader}>
            <h2>My comments</h2>
            <span>{comments.length}</span>
          </div>

          {comments.length > 0 ? (
            <div className={styles.list}>
              {comments.map((comment) => (
                <article className={styles.item} key={comment.id}>
                  <div className={styles.itemMeta}>
                    <time dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time>
                    <span>{comment.post.published ? "Public post" : "Hidden post"}</span>
                  </div>
                  <p>{previewText(comment.body)}</p>
                  <div className={styles.postLink}>
                    {comment.post.published ? (
                      <Link href={`/blog/${comment.post.slug}`}>{comment.post.title}</Link>
                    ) : (
                      comment.post.title
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No comments yet</h3>
              <p>Your blog comments will appear here after you join a discussion.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
