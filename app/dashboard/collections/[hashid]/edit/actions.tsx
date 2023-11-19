"use server";

import prisma from "db";
import { Collection } from "@prisma/client";
import { auth } from "@auth/auth";
import { FormValueTypes } from "../../form";
import { decodeHashid } from "app/api/hashids";

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
