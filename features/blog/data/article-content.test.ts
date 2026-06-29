import { describe, expect, it } from "vitest";

import { parseArticleContent } from "@/features/blog/data/article-content";

describe("parseArticleContent", () => {
  it("parses paragraphs and level 2/3 headings", () => {
    const article = parseArticleContent(
      [
        "Intro paragraph.",
        "",
        "## First Section",
        "Body text.",
        "### Details",
        "More body text.",
      ].join("\n"),
    );

    expect(article.headings).toEqual([
      { id: "first-section", level: 2, text: "First Section" },
      { id: "details", level: 3, text: "Details" },
    ]);
    expect(article.blocks).toEqual([
      { text: "Intro paragraph.", type: "paragraph" },
      {
        id: "first-section",
        level: 2,
        text: "First Section",
        type: "heading",
      },
      { text: "Body text.", type: "paragraph" },
      { id: "details", level: 3, text: "Details", type: "heading" },
      { text: "More body text.", type: "paragraph" },
    ]);
  });

  it("deduplicates generated heading ids", () => {
    const article = parseArticleContent(
      ["## Same Heading", "### Same Heading", "## Same Heading"].join("\n"),
    );

    expect(article.headings.map((heading) => heading.id)).toEqual([
      "same-heading",
      "same-heading-2",
      "same-heading-3",
    ]);
  });

  it("uses a stable fallback id when heading text has no slug characters", () => {
    const article = parseArticleContent("## !!!");

    expect(article.headings).toEqual([
      { id: "section-1", level: 2, text: "!!!" },
    ]);
  });
});
