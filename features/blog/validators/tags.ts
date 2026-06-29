export const slugifyTag = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const normalizeTags = (value?: string | null) => {
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

export const tagConnectOrCreate = (tags?: string | null) =>
  normalizeTags(tags).map((tag) => ({
    where: { slug: tag.slug },
    create: tag,
  }));
