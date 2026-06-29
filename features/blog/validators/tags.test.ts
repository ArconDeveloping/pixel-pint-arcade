import { describe, expect, it } from "vitest";

import {
  normalizeTags,
  slugifyTag,
  tagConnectOrCreate,
} from "@/features/blog/validators/tags";

describe("tag normalization", () => {
  it("slugifies tag names", () => {
    expect(slugifyTag(" Retro Consoles! ")).toBe("retro-consoles");
  });

  it("trims, normalizes, and deduplicates tags by slug", () => {
    expect(
      normalizeTags("Arcade, arcade, Retro Games, retro-games, , 2D Games"),
    ).toEqual([
      { name: "Arcade", slug: "arcade" },
      { name: "Retro Games", slug: "retro-games" },
      { name: "2D Games", slug: "2d-games" },
    ]);
  });

  it("creates connectOrCreate payloads from normalized tags", () => {
    expect(tagConnectOrCreate("Arcade, Retro")).toEqual([
      {
        where: { slug: "arcade" },
        create: { name: "Arcade", slug: "arcade" },
      },
      {
        where: { slug: "retro" },
        create: { name: "Retro", slug: "retro" },
      },
    ]);
  });
});
