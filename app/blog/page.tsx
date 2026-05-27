import type { Metadata } from "next";
import Link from "next/link";

import { getPublishedPosts } from "@/data/posts";
import styles from "./BlogPage.module.css";

export const metadata: Metadata = {
  title: "Blog | Pixel Pint Arcade",
  description: "Articles about 2D games, consoles, hardware and retro culture.",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className={styles.page}>
      <div className="wrap">
        <div className={styles.topline}>
          <div className="eyebrow">Pixel Pint Arcade Blog</div>
          <Link className={styles.homeLink} href="/">
            Back home
          </Link>
        </div>

        <section className={styles.intro}>
          <h1>Blog</h1>
          <p>
            Notes, breakdowns and stories about 2D games, retro hardware, consoles
            and the culture around them.
          </p>
        </section>

        {posts.length > 0 ? (
          <section className={styles.grid} aria-label="Published posts">
            {posts.map((post) => (
              <Link className={styles.card} href={`/blog/${post.slug}`} key={post.id}>
                <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                <h2>{post.title}</h2>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
                <span>By {post.author.name}</span>
              </Link>
            ))}
          </section>
        ) : (
          <section className={styles.emptyState}>
            <h2>No posts yet</h2>
            <p>
              The first stories are still being prepared. Check back soon for
              notes on 2D games, retro hardware and arcade culture.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
