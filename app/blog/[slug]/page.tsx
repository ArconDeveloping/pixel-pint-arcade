import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentsSection } from "@/components/comments/CommentsSection";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ArticleBody } from "@/components/posts/ArticleBody";
import { RelatedPosts } from "@/components/posts/RelatedPosts";
// import { SocialShare } from "@/components/posts/SocialShare";
import { TableOfContents } from "@/components/posts/TableOfContents";
import { getCurrentSession, requireUserRecord } from "@/data/auth";
import { getCommentsForPost } from "@/data/comments";
import { getPublishedPostBySlug, getRelatedPosts } from "@/data/posts";
import { parseArticleContent } from "@/lib/article-content";
import { formatReadingTime, getReadingTimeMinutes } from "@/lib/reading-time";
import styles from "./PostPage.module.css";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

// const getPostUrl = (slug: string) => {
//   const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
//     "http://localhost:3000";
//
//   return `${siteUrl}/blog/${slug}`;
// };

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Pixel Pint Arcade",
    };
  }

  return {
    title: `${post.title} | Pixel Pint Arcade`,
    description: post.excerpt ?? "Pixel Pint Arcade blog article.",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [comments, relatedPosts, session] = await Promise.all([
    getCommentsForPost(post.id),
    getRelatedPosts({
      postId: post.id,
      tagSlugs: post.tags.map((tag) => tag.slug),
    }),
    getCurrentSession(),
  ]);
  const currentUser = session?.user ? await requireUserRecord() : null;
  const readingTime = formatReadingTime(getReadingTimeMinutes(post.content));
  const article = parseArticleContent(post.content);
  // const postUrl = getPostUrl(post.slug);

  return (
    <main className="page-shell">
      <div className="wrap">
        <article>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/blog", label: "Blog" },
              { label: post.title },
            ]}
          />
          <Link className={`pixel-link ${styles.backLink}`} href="/blog">
            Back
          </Link>
          <div className="eyebrow">Article</div>
          <h1>{post.title}</h1>
          <p className={styles.meta}>
            {formatDate(post.createdAt)} · {readingTime} · By {post.author.name}
          </p>
          {post.tags.length > 0 ? (
            <div className={`tag-list ${styles.tags}`} aria-label="Post tags">
              {post.tags.map((tag) => (
                <span className={`tag-chip ${styles.tag}`} key={tag.slug}>
                  {tag.name}
                </span>
              ))}
            </div>
          ) : null}
          {/* <SocialShare title={post.title} url={postUrl} /> */}
          <TableOfContents headings={article.headings} />
          <ArticleBody blocks={article.blocks} />
        </article>
        <RelatedPosts posts={relatedPosts} />
        <CommentsSection
          comments={comments}
          currentUser={currentUser}
          postId={post.id}
          postSlug={post.slug}
        />
      </div>
    </main>
  );
}
