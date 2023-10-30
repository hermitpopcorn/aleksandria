"use server";

import prisma from "db";
import { Collection, Item } from "@prisma/client";
import { auth } from "@auth/auth";
import { FormValueTypes } from "./form";
import { decodeHashid } from "app/api/hashids";

export async function postAddItem(formValues: FormValueTypes): Promise<Item> {
  const collection = await findCollection(formValues.collectionHashid);

  return await prisma.item.create({
    data: {
      collectionId: collection.id,
      type: formValues.type,
      title: formValues.title.trim(),
      titleAlphabetic: formValues.titleAlphabetic.trim()
        ? formValues.titleAlphabetic.trim()
        : formValues.title.trim(),
      isbn13: formValues.isbn13.trim() ? formValues.isbn13.trim() : null,
      note: formValues.note.trim() ? formValues.note.trim() : null,
      cover: formValues.cover.trim() ? formValues.cover.trim() : null,
      copies: formValues.copies !== undefined ? Number(formValues.copies) : 1,
    },
  });
}

async function findCollection(hashid: string): Promise<Collection> {
  const session = await auth();
  const id = decodeHashid(hashid);

  return await prisma.collection.findFirstOrThrow({
    where: {
      userId: session?.user.id,
      id,
    },
  });
}
