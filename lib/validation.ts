import { z } from "zod";

export const commentSchema = z.object({
  postId: z.string().min(1),
  parentId: z.string().min(1).nullable().optional(),
  body: z.string().trim().min(1).max(2000),
});

export const deleteCommentSchema = z.object({
  commentId: z.string().min(1),
  postSlug: z.string().min(1).optional(),
});

export const postSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().max(300).nullable().optional(),
  coverImageUrl: z.string().trim().url().max(1000).nullable().optional(),
  coverImageAlt: z.string().trim().max(180).nullable().optional(),
  seoTitle: z.string().trim().max(160).nullable().optional(),
  seoDescription: z.string().trim().max(300).nullable().optional(),
  tags: z.string().trim().max(240).optional(),
  content: z.string().trim().min(1),
  published: z.boolean().optional(),
  commentsEnabled: z.boolean().optional(),
});

export const updatePostSchema = postSchema.extend({
  postId: z.string().min(1),
});

export const deletePostSchema = z.object({
  postId: z.string().min(1),
});
