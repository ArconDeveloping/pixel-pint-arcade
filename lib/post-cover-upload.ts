import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const MAX_COVER_IMAGE_SIZE = 5 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "posts");
const PUBLIC_UPLOAD_DIR = "/uploads/posts";

const allowedImageTypes = new Map([
  ["image/gif", "gif"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export const savePostCoverImage = async (
  value: FormDataEntryValue | null,
): Promise<string | undefined> => {
  if (!(value instanceof File) || value.size === 0) {
    return undefined;
  }

  const extension = allowedImageTypes.get(value.type);

  if (!extension) {
    throw new Error("InvalidCoverImageType");
  }

  if (value.size > MAX_COVER_IMAGE_SIZE) {
    throw new Error("CoverImageTooLarge");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const fileName = `${randomUUID()}.${extension}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const buffer = Buffer.from(await value.arrayBuffer());

  await writeFile(filePath, buffer);

  return `${PUBLIC_UPLOAD_DIR}/${fileName}`;
};
