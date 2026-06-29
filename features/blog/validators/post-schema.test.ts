import { describe, expect, it } from "vitest";

import {
  deletePostSchema,
  postSchema,
  updatePostSchema,
} from "@/features/blog/validators/post-schema";

const validPostInput = {
  title: "A good post",
  slug: "a-good-post",
  excerpt: "Short summary",
  coverImageAlt: "Cover image",
  seoTitle: "SEO title",
  seoDescription: "SEO description",
  tags: "Arcade, Retro",
  content: "Post body",
  published: true,
  commentsEnabled: true,
};

describe("postSchema", () => {
  it("accepts valid post input", () => {
    expect(postSchema.safeParse(validPostInput).success).toBe(true);
  });

  it.each([
    "Bad Slug",
    "bad_slug",
    "-bad-slug",
    "bad-slug-",
    "bad--slug",
    "bad.slug",
  ])("rejects invalid slug %s", (slug) => {
    expect(postSchema.safeParse({ ...validPostInput, slug }).success).toBe(
      false,
    );
  });

  it("rejects empty title and content after trimming", () => {
    const result = postSchema.safeParse({
      ...validPostInput,
      title: "   ",
      content: "\n\t",
    });

    expect(result.success).toBe(false);
  });
});

describe("post mutation schemas", () => {
  it("requires postId for update input", () => {
    expect(
      updatePostSchema.safeParse({ ...validPostInput, postId: "post-1" })
        .success,
    ).toBe(true);
    expect(updatePostSchema.safeParse(validPostInput).success).toBe(false);
  });

  it("requires postId for delete input", () => {
    expect(deletePostSchema.safeParse({ postId: "post-1" }).success).toBe(
      true,
    );
    expect(deletePostSchema.safeParse({ postId: "" }).success).toBe(false);
  });
});
