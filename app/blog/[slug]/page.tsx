import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentsSection } from "@/components/comments/CommentsSection";
import { getCurrentSession, requireUserRecord } from "@/data/auth";
import { getCommentsForPost } from "@/data/comments";
import { getPublishedPostBySlug } from "@/data/posts";
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

  const [comments, session] = await Promise.all([
    getCommentsForPost(post.id),
    getCurrentSession(),
  ]);
  const currentUser = session?.user ? await requireUserRecord() : null;

  return (
    <main className={styles.page}>
      <div className="wrap">
        <article className={styles.article}>
          <Link className={styles.backLink} href="/blog">
            Back to blog
          </Link>
          <div className="eyebrow">Article</div>
          <h1>{post.title}</h1>
          <p className={styles.meta}>
            {formatDate(post.createdAt)} · By {post.author.name}
          </p>
          <div className={styles.content}>{post.content}</div>
        </article>
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
