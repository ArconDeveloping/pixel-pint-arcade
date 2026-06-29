import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { DeletePostButton } from "@/features/blog/components/DeletePostButton";
import { getCurrentUserPosts } from "@/features/blog/data/posts";
import { getCurrentSession } from "@/server/auth";
import { requireUserRecord } from "@/server/permissions";
import styles from "./AdminPostsPage.module.css";

export const metadata: Metadata = {
  title: "Manage Posts | Pixel Pint Arcade",
  description: "Manage Pixel Pint Arcade blog posts.",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default async function AdminPostsPage() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await requireUserRecord();

  if (user.role !== "ADMIN") {
    redirect("/account");
  }

  const posts = await getCurrentUserPosts();

  return (
    <main className="page-shell">
      <div className="wrap">
        <div className={`page-topline ${styles.topline}`}>
          <Link className="pixel-link" href="/account">
            Account
          </Link>
          <Link className="pixel-link" href="/admin/posts/new">
            Write post
          </Link>
        </div>

        <section className={styles.intro}>
          <div className="eyebrow">Admin</div>
          <h1>Manage posts</h1>
          <p>Create, edit, publish, and delete blog posts.</p>
        </section>

        {posts.length > 0 ? (
          <section className={styles.list} aria-label="Admin posts">
            {posts.map((post) => (
              <article className={styles.item} key={post.id}>
                <div className={styles.itemMeta}>
                  <span
                    className={post.published ? styles.published : styles.draft}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <time dateTime={post.updatedAt}>
                    Updated {formatDate(post.updatedAt)}
                  </time>
                </div>
                <h2>
                  {post.published ? (
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  ) : (
                    post.title
                  )}
                </h2>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
                {post.tags.length > 0 ? (
                  <div className={`tag-list ${styles.tags}`} aria-label="Post tags">
                    {post.tags.map((tag) => (
                      <Link
                        className="tag-chip"
                        href={`/blog?q=${encodeURIComponent(tag.name)}`}
                        key={tag.slug}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
                <div className={styles.itemActions}>
                  <Link
                    className="pixel-link"
                    href={`/admin/posts/${post.id}/edit`}
                  >
                    Edit
                  </Link>
                  <DeletePostButton postId={post.id} postTitle={post.title} />
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className={styles.emptyState}>
            <h2>No posts yet</h2>
            <p>Create the first post from the admin editor.</p>
          </section>
        )}
      </div>
    </main>
  );
}
