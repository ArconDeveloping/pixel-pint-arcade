import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

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

type BlogPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

const getSearchValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  await connection();

  const params = await searchParams;
  const query = getSearchValue(params.q)?.trim() ?? "";
  const posts = await getPublishedPosts({ query });
  const hasSearch = query.length > 0;

  return (
    <main className="page-shell">
      <div className="wrap">
        <div className={`page-topline ${styles.topline}`}>
          <div className="eyebrow">Pixel Pint Arcade Blog</div>
          <Link className="pixel-link" href="/">
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

        <form action="/blog" className={styles.searchForm}>
          <div className={styles.searchField}>
            <label htmlFor="blog-search">Search articles</label>
            <input
              id="blog-search"
              name="q"
              defaultValue={query}
              placeholder="Search posts..."
              type="search"
            />
          </div>
          <div className={styles.searchActions}>
            <button className="btn" type="submit">
              Search
            </button>
            {hasSearch ? (
              <Link className="pixel-link" href="/blog">
                Clear
              </Link>
            ) : null}
          </div>
        </form>

        {posts.length > 0 ? (
          <section className={styles.grid} aria-label="Published posts">
            {posts.map((post) => (
              <Link className={styles.card} href={`/blog/${post.slug}`} key={post.id}>
                <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                <h2>{post.title}</h2>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
                {post.tags.length > 0 ? (
                  <div className="tag-list" aria-label="Post tags">
                    {post.tags.map((tag) => (
                      <span className="tag-chip" key={tag.slug}>{tag.name}</span>
                    ))}
                  </div>
                ) : null}
                <span>By {post.author.name}</span>
              </Link>
            ))}
          </section>
        ) : (
          <section className={styles.emptyState}>
            {hasSearch ? (
              <>
                <h2>No posts found</h2>
                <p>No articles match &quot;{query}&quot;. Try another search.</p>
              </>
            ) : (
              <>
                <h2>No posts yet</h2>
                <p>
                  The first stories are still being prepared. Check back soon for
                  notes on 2D games, retro hardware and arcade culture.
                </p>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
