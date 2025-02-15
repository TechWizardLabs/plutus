"use server";

import prisma from "@/db";
import { User } from "@prisma/client";

interface ExternalAccount {
  provider: string;
}

interface ClerkUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  externalAccounts?: ExternalAccount[];
  email: string;
  token: string;
}

export async function createOrUpdateUser(clerkUser: ClerkUser): Promise<User> {
  const providerList: string[] = clerkUser.externalAccounts?.map((acc) => acc.provider) || [];

  return await prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      imageUrl: clerkUser.imageUrl ?? null,
      provider: providerList.join(","),
      email: clerkUser.email,
      token: clerkUser.token,
    },
    create: {
      clerkId: clerkUser.id,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      imageUrl: clerkUser.imageUrl ?? null,
      provider: providerList.join(","),
      email: clerkUser.email,
      token: clerkUser.token,
    },
  });
}
