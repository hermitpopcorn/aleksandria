"use server";

import prisma from "db";
import { Collection } from "@prisma/client";
import { auth } from "@auth/auth";
import { FormValueTypes } from "./form";
import { decodeCollectionHashid } from "app/api/hashids";

export async function postAddCollection(formValues: FormValueTypes): Promise<Collection> {
  const session = await auth();

  return await prisma.collection.create({
    data: {
      userId: session!.user.id,
      name: formValues.name.trim(),
      type: formValues.type,
      public: formValues.public,
    },
  });
}

export async function editExistingCollection(
  formValues: FormValueTypes,
): Promise<Collection> {
  const session = await auth();

  if (!formValues.hashid) {
    throw new Error("No ID supplied.");
  }

  const realId = decodeCollectionHashid(formValues.hashid!);

  return await prisma.collection.update({
    where: {
      id: realId,
    },
    data: {
      userId: session!.user.id,
      name: formValues.name.trim(),
      type: formValues.type,
      public: formValues.public,
    },
  });
}

export async function deleteCollection(hashid: string): Promise<Collection> {
  const session = await auth();

  const realId = decodeCollectionHashid(hashid);

  return await prisma.collection.delete({
    where: {
      userId: session!.user.id,
      id: realId,
    },
  });
}
