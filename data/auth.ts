import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getCurrentSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

export const requireUser = cache(async () => {
  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
});

export const requireUserRecord = cache(async () => {
  const user = await requireUser();
  const userRecord = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });

  if (!userRecord) {
    throw new Error("Unauthorized");
  }

  return userRecord;
});

export const requireAdmin = cache(async () => {
  const user = await requireUserRecord();

  if (user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return user;
});
