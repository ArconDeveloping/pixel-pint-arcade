import "server-only";

import { prisma } from "@/lib/prisma";
import { requireUserRecord } from "@/data/auth";

export type CommentDTO = {
  id: string;
  body: string;
  postId: string;
  parentId: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
};

export type AccountCommentDTO = {
  id: string;
  body: string;
  createdAt: string;
  post: {
    title: string;
    slug: string;
    published: boolean;
  };
};

const toCommentDTO = (comment: {
  id: string;
  body: string;
  postId: string;
  parentId: string | null;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
}): CommentDTO => ({
  ...comment,
  createdAt: comment.createdAt.toISOString(),
});

export const getCommentsForPost = async (
  postId: string,
): Promise<CommentDTO[]> => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      post: {
        published: true,
      },
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      body: true,
      postId: true,
      parentId: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return comments.map(toCommentDTO);
};

export const createComment = async (input: {
  postId: string;
  parentId?: string | null;
  body: string;
}): Promise<CommentDTO> => {
  const user = await requireUserRecord();
  const post = await prisma.post.findFirst({
    where: {
      id: input.postId,
      published: true,
    },
    select: {
      commentsEnabled: true,
      id: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (!post.commentsEnabled) {
    throw new Error("Comments closed");
  }

  if (input.parentId) {
    const parent = await prisma.comment.findFirst({
      where: {
        id: input.parentId,
        postId: input.postId,
      },
      select: { id: true },
    });

    if (!parent) {
      throw new Error("Parent comment not found");
    }
  }

  const comment = await prisma.comment.create({
    data: {
      body: input.body,
      postId: input.postId,
      parentId: input.parentId,
      authorId: user.id,
    },
    select: {
      id: true,
      body: true,
      postId: true,
      parentId: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return toCommentDTO(comment);
};

export const getCurrentUserComments = async (): Promise<AccountCommentDTO[]> => {
  const user = await requireUserRecord();
  const comments = await prisma.comment.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      body: true,
      createdAt: true,
      post: {
        select: {
          title: true,
          slug: true,
          published: true,
        },
      },
    },
  });

  return comments.map((comment) => ({
    ...comment,
    createdAt: comment.createdAt.toISOString(),
  }));
};

export const deleteComment = async (commentId: string) => {
  const user = await requireUserRecord();
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.authorId !== user.id && user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  await prisma.comment.delete({
    where: { id: comment.id },
  });
};
