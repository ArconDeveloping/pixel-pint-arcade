import "server-only";

import { prisma } from "@/lib/prisma";
import { requireAdmin, requireUserRecord } from "@/data/auth";

export type PostListItemDTO = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: string;
  author: {
    name: string;
    image: string | null;
  };
};

export type PostDetailDTO = PostListItemDTO & {
  content: string;
};

export type AccountPostDTO = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const postListSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  createdAt: true,
  author: {
    select: {
      name: true,
      image: true,
    },
  },
} as const;

const toPostListItemDTO = (post: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: Date;
  author: {
    name: string;
    image: string | null;
  };
}): PostListItemDTO => ({
  ...post,
  createdAt: post.createdAt.toISOString(),
});

export const getPublishedPosts = async (): Promise<PostListItemDTO[]> => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: postListSelect,
  });

  return posts.map(toPostListItemDTO);
};

export const getPublishedPostBySlug = async (
  slug: string,
): Promise<PostDetailDTO | null> => {
  const post = await prisma.post.findFirst({
    where: { slug, published: true },
    select: {
      ...postListSelect,
      content: true,
    },
  });

  if (!post) {
    return null;
  }

  return {
    ...toPostListItemDTO(post),
    content: post.content,
  };
};

export const getCurrentUserPosts = async (): Promise<AccountPostDTO[]> => {
  const user = await requireUserRecord();
  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));
};

export const createPost = async (input: {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  published?: boolean;
}) => {
  const admin = await requireAdmin();

  await prisma.post.create({
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content,
      published: input.published ?? false,
      authorId: admin.id,
    },
  });
};

export const updatePost = async (
  postId: string,
  input: {
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    published?: boolean;
  },
) => {
  await requireAdmin();

  await prisma.post.update({
    where: { id: postId },
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content,
      published: input.published ?? false,
    },
  });
};

export const deletePost = async (postId: string) => {
  await requireAdmin();

  await prisma.post.delete({
    where: { id: postId },
  });
};
