import "server-only";

import { prisma } from "@/lib/prisma";
import { requireAdmin, requireUserRecord } from "@/data/auth";

export type PostListItemDTO = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: string;
  tags: {
    name: string;
    slug: string;
  }[];
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
  tags: {
    name: string;
    slug: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

const postListSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  createdAt: true,
  tags: {
    orderBy: { name: "asc" },
    select: {
      name: true,
      slug: true,
    },
  },
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
  tags: {
    name: string;
    slug: string;
  }[];
  author: {
    name: string;
    image: string | null;
  };
}): PostListItemDTO => ({
  ...post,
  createdAt: post.createdAt.toISOString(),
});

const slugifyTag = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeTags = (value?: string | null) => {
  const tags = new Map<string, { name: string; slug: string }>();

  value
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .forEach((name) => {
      const slug = slugifyTag(name);

      if (slug && !tags.has(slug)) {
        tags.set(slug, { name, slug });
      }
    });

  return [...tags.values()];
};

const tagConnectOrCreate = (tags?: string | null) =>
  normalizeTags(tags).map((tag) => ({
    where: { slug: tag.slug },
    create: tag,
  }));

export const getPublishedPosts = async (options?: {
  query?: string;
}): Promise<PostListItemDTO[]> => {
  const query = options?.query?.trim();

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { excerpt: { contains: query, mode: "insensitive" } },
              { content: { contains: query, mode: "insensitive" } },
              {
                tags: {
                  some: {
                    name: { contains: query, mode: "insensitive" },
                  },
                },
              },
            ],
          }
        : {}),
    },
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
      tags: {
        orderBy: { name: "asc" },
        select: {
          name: true,
          slug: true,
        },
      },
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
  tags?: string | null;
  content: string;
  published?: boolean;
}) => {
  const admin = await requireAdmin();
  const tags = tagConnectOrCreate(input.tags);

  await prisma.post.create({
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content,
      published: input.published ?? false,
      author: {
        connect: { id: admin.id },
      },
      ...(tags.length > 0
        ? {
            tags: {
              connectOrCreate: tags,
            },
          }
        : {}),
    },
  });
};

export const updatePost = async (
  postId: string,
  input: {
    title: string;
    slug: string;
    excerpt?: string | null;
    tags?: string | null;
    content: string;
    published?: boolean;
  },
) => {
  await requireAdmin();
  const tags = tagConnectOrCreate(input.tags);

  await prisma.post.update({
    where: { id: postId },
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content,
      published: input.published ?? false,
      ...(input.tags !== undefined
        ? {
            tags: {
              set: [],
              connectOrCreate: tags,
            },
          }
        : {}),
    },
  });
};

export const deletePost = async (postId: string) => {
  await requireAdmin();

  await prisma.post.delete({
    where: { id: postId },
  });
};
