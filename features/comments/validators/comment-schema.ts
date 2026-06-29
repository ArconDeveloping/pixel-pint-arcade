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
