"use server";

import prisma from "db";
import { Collection } from "@prisma/client";
import { auth } from "@auth/auth";
import { FormValueTypes } from "./form";
import { decodeHashid } from "app/api/hashids";

export async function postAddCollection(formValues: FormValueTypes): Promise<Collection> {
  const session = await auth();

  return await prisma.collection.create({
    data: {
      userId: session!.user.id,
      name: formValues.name.trim(),
      type: formValues.type,
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

  const realId = decodeHashid(formValues.hashid!);

  return await prisma.collection.update({
    where: {
      id: realId,
    },
    data: {
      userId: session!.user.id,
      name: formValues.name.trim(),
      type: formValues.type,
    },
  });
}

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
