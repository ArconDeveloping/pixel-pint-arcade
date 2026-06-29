import { describe, expect, it } from "vitest";

import { formatReadingTime, getReadingTimeMinutes } from "@/lib/formatting";

describe("reading time formatting", () => {
  it("returns at least one minute for empty content", () => {
    expect(getReadingTimeMinutes("")).toBe(1);
    expect(getReadingTimeMinutes("   \n\t")).toBe(1);
  });

  it("rounds up using 200 words per minute", () => {
    const twoHundredWords = Array.from({ length: 200 }, (_, index) =>
      `word${index}`,
    ).join(" ");
    const twoHundredOneWords = `${twoHundredWords} extra`;

    expect(getReadingTimeMinutes(twoHundredWords)).toBe(1);
    expect(getReadingTimeMinutes(twoHundredOneWords)).toBe(2);
  });

  it("formats the reading time label", () => {
    expect(formatReadingTime(3)).toBe("3 min read");
  });
});
