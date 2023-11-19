"use server";

import prisma from "db";
import { Collection } from "@prisma/client";
import { auth } from "@auth/auth";
import { decodeHashid } from "app/api/hashids";

export async function deleteCollection(hashid: string): Promise<Collection> {
  const session = await auth();

  const realId = decodeHashid(hashid);

  return await prisma.collection.delete({
    where: {
      userId: session!.user.id,
      id: realId,
    },
  });
}
