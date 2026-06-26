import "server-only";

import { prisma } from "@/lib/prisma";
import { requireUserRecord } from "@/data/auth";

export type PostEngagementDTO = {
  likesCount: number;
  likedByCurrentUser: boolean;
  bookmarkedByCurrentUser: boolean;
};

export type SavedPostDTO = {
  id: string;
  savedAt: string;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: string;
  author: {
    name: string;
  };
};

export const getPostEngagement = async (
  postId: string,
  userId?: string,
): Promise<PostEngagementDTO> => {
  const [likesCount, like, bookmark] = await Promise.all([
    prisma.postLike.count({ where: { postId } }),
    userId
      ? prisma.postLike.findUnique({
          where: { postId_userId: { postId, userId } },
          select: { id: true },
        })
      : Promise.resolve(null),
    userId
      ? prisma.postBookmark.findUnique({
          where: { postId_userId: { postId, userId } },
          select: { id: true },
        })
      : Promise.resolve(null),
  ]);

  return {
    likesCount,
    likedByCurrentUser: Boolean(like),
    bookmarkedByCurrentUser: Boolean(bookmark),
  };
};

const requirePublishedPost = async (postId: string) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      published: true,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const togglePostLike = async (postId: string) => {
  const user = await requireUserRecord();
  const post = await requirePublishedPost(postId);
  const existingLike = await prisma.postLike.findUnique({
    where: { postId_userId: { postId, userId: user.id } },
    select: { id: true },
  });

  if (existingLike) {
    await prisma.postLike.delete({
      where: { id: existingLike.id },
    });

    return { liked: false, slug: post.slug };
  }

  await prisma.postLike.create({
    data: {
      postId,
      userId: user.id,
    },
  });

  return { liked: true, slug: post.slug };
};

export const togglePostBookmark = async (postId: string) => {
  const user = await requireUserRecord();
  const post = await requirePublishedPost(postId);
  const existingBookmark = await prisma.postBookmark.findUnique({
    where: { postId_userId: { postId, userId: user.id } },
    select: { id: true },
  });

  if (existingBookmark) {
    await prisma.postBookmark.delete({
      where: { id: existingBookmark.id },
    });

    return { bookmarked: false, slug: post.slug };
  }

  await prisma.postBookmark.create({
    data: {
      postId,
      userId: user.id,
    },
  });

  return { bookmarked: true, slug: post.slug };
};

export const getCurrentUserSavedPosts = async (): Promise<SavedPostDTO[]> => {
  const user = await requireUserRecord();
  const bookmarks = await prisma.postBookmark.findMany({
    where: {
      userId: user.id,
      post: {
        published: true,
      },
    },
    orderBy: { createdAt: "desc" },
    select: {
      createdAt: true,
      post: {
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          createdAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return bookmarks.map((bookmark) => ({
    id: bookmark.post.id,
    savedAt: bookmark.createdAt.toISOString(),
    title: bookmark.post.title,
    slug: bookmark.post.slug,
    excerpt: bookmark.post.excerpt,
    createdAt: bookmark.post.createdAt.toISOString(),
    author: bookmark.post.author,
  }));
};
