"use server";

import { generateToken } from "@/lib/auth";
import { createOrUpdateUser } from "@/lib/createOrupdateUser";
import { currentUser } from "@clerk/nextjs/server";

export default async function UserSync() {
  const user = await currentUser();

  if (!user) return null;

  const token = await generateToken({
    userId: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
  });

  try {
    await createOrUpdateUser({
      id: user.id,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      imageUrl: user.imageUrl ?? "",
      externalAccounts: user.externalAccounts?.map((acc) => ({ provider: acc.provider })) ?? [],
      email: user.emailAddresses[0].emailAddress,
      token
    });

    console.log("✅ User sync successful");
  } catch (error) {
    console.error("❌ Error syncing user:", error);
  }

  return null;
}
