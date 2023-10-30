"use server";

import prisma from "db";
import { Collection } from "@prisma/client";
import { auth } from "@auth/auth";
import { FormValueTypes } from "./form";

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
