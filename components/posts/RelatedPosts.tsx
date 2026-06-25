import Link from "next/link";

import type { PostListItemDTO } from "@/data/posts";
import styles from "./RelatedPosts.module.css";

type RelatedPostsProps = {
  posts: PostListItemDTO[];
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.related} aria-labelledby="related-posts-title">
      <div className={styles.header}>
        <div className="eyebrow">Keep playing</div>
        <h2 id="related-posts-title">Related posts</h2>
      </div>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link className={styles.card} href={`/blog/${post.slug}`} key={post.id}>
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            <h3>{post.title}</h3>
            {post.excerpt ? <p>{post.excerpt}</p> : null}
            {post.tags.length > 0 ? (
              <div className="tag-list" aria-label="Related post tags">
                {post.tags.map((tag) => (
                  <span className="tag-chip" key={tag.slug}>
                    {tag.name}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
};
