import type { ArticleBlock, ArticleHeading } from "@/features/blog/types";

const headingPattern = /^(#{2,3})\s+(.+)$/;

const slugifyHeading = (value: string, fallback: string) => {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
};

export const parseArticleContent = (content: string) => {
  const blocks: ArticleBlock[] = [];
  const headings: ArticleHeading[] = [];
  const usedIds = new Map<string, number>();
  let paragraphLines: string[] = [];

  const pushParagraph = () => {
    const text = paragraphLines.join("\n").trim();

    if (text) {
      blocks.push({ text, type: "paragraph" });
    }

    paragraphLines = [];
  };

  content.split(/\r?\n/).forEach((line, index) => {
    const headingMatch = line.match(headingPattern);

    if (!headingMatch) {
      paragraphLines.push(line);
      return;
    }

    pushParagraph();

    const level = headingMatch[1].length as 2 | 3;
    const text = headingMatch[2].trim();
    const baseId = slugifyHeading(text, `section-${index + 1}`);
    const count = usedIds.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    usedIds.set(baseId, count + 1);

    blocks.push({ id, level, text, type: "heading" });
    headings.push({ id, level, text });
  });

  pushParagraph();

  return { blocks, headings };
};
